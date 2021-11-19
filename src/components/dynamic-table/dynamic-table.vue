<template>
  <Table
    ref="tableRef"
    :columns="columns"
    :loading="loading"
    :rowSelection="rowSelection"
    :rowKey="rowKey"
    size="middle"
    :data-source="tableData"
    :pagination="pageOptions"
    bordered
    :customRow="customRow"
    v-bind="$attrs"
    @change="paginationChange"
  >
    <!--  自定义slots start-->
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
    <!--    自定义slots end-->

    <!--    是否有自定义显示slots start-->
    <template
      v-for="slotItem in columns.filter((item) => !!item.slots?.customRender)"
      :key="slotItem.dataIndex || slotItem.slots?.customRender"
      #[slotItem.slots.customRender]="slotProps"
    >
      <!--        自定义渲染start-->
      <slot
        v-if="slotItem.slots?.customRender && $slots[slotItem.slots?.customRender]"
        :name="slotItem.slots?.customRender"
        v-bind="slotProps"
      ></slot>
      <!--        自定义渲染end-->

      <!--     非自定义渲染start -->
      <template v-else>
        <!--        非操作 start-->
        <template v-if="slotItem.slots?.customRender !== 'action'">
          <!--        使用自定义组件格式化显示start-->
          <template v-if="slotItem.slotsType == 'component'">
            <component :is="slotItem?.slotsFunc?.(slotProps.record)" />
          </template>
          <!--        使用自定义组件格式化显示end-->
          <!--        使用自定义函数格式化显示-->
          <template v-if="slotItem.slotsType == 'format'">
            {{
              slotItem?.slotsFunc?.(
                slotProps.record[slotItem.dataIndex ?? slotItem.key],
                slotProps.record
              )
            }}
          </template>
        </template>
        <!--      非操作 end-->

        <!--        操作start-->
        <div
          v-if="slotItem.slots?.customRender == 'action'"
          :key="slotItem.slots.customRender"
          class="actions"
        >
          <!--        对表格的操作动作start-->
          <template v-for="(action, index) in actions">
            <!--            编辑按钮-->
            <template v-if="action.type === 'button'">
              <a-button
                v-bind="{ ...buttonProps, ...action.props }"
                :key="index"
                v-permission="action.permission"
                @click="actionEvent(slotProps.record, action.func)"
              >
                {{ action.text }}
              </a-button>
            </template>
            <!--            删除按钮 气泡确认框-->
            <template v-if="action.type === 'popconfirm'">
              <a-popconfirm
                :key="index"
                placement="leftTop"
                @confirm="actionEvent(slotProps.record, action.func, 'del')"
              >
                <template #title> 您确定要删除吗？ </template>
                <a-button
                  v-permission="action.permission"
                  v-bind="{ ...buttonProps, ...action.props }"
                >
                  {{ action.text }}
                </a-button>
              </a-popconfirm>
            </template>
          </template>
          <!--        对表格的操作动作end-->
        </div>
        <!--      操作end-->
      </template>
      <!--      非自定义渲染end-->
    </template>
    <!--    是否有自定义显示slots end-->
  </Table>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, toRefs, watch } from 'vue'
import { Card, Select, Table, Popconfirm } from 'ant-design-vue'
import { TableProps } from 'ant-design-vue/lib/table/interface'
import { usePagination, PageOption } from '@/hooks/usePagination'
import { useDragRow, useDragCol, useCalculate } from './hooks'

export default defineComponent({
  name: 'DynamicTable',
  components: {
    Table,
    [Card.name]: Card,
    [Select.name]: Select,
    [Popconfirm.name]: Popconfirm,
    Option: Select.Option
  },
  inheritAttrs: false,
  props: {
    dataSource: {
      type: Array as PropType<any[]>
    },
    columns: {
      type: Object as PropType<TableColumn[]>,
      required: true
    },
    getListFunc: {
      // 获取列表数据函数API
      type: Function
    },
    rowSelection: {
      type: Object
    },
    rowKey: {
      // 表格唯一字段
      type: [String, Function] as PropType<string | ((record: any) => string)>
    },
    pageOption: {
      // 分页参数
      type: Object as PropType<PageOption>,
      default: () => ({})
    },
    showSummary: {
      // 是否在表格尾部展示合计行
      type: Boolean as PropType<boolean>,
      default: false
    },
    sumText: {
      // 合计显示文本
      type: String as PropType<string>,
      default: '合计'
    },
    /** 合计行计算方法 */
    summaryFunc: {
      type: Function as PropType<(params: { dataSource: any; columns: any }) => string[]>
    },
    dragColEnable: {
      // 是否开启列拖拽
      type: Boolean as PropType<boolean>,
      default: true
    },
    dragRowEnable: Boolean as PropType<boolean>
  },
  emits: ['change', 'update:pageOption'],
  setup(props, { emit, slots }) {
    const tableRef = ref<InstanceType<typeof Table>>()
    console.log('slots', slots)
    const { pageOptions } = usePagination()
    const { setCalculateRow } = useCalculate()

    Object.assign(pageOptions.value, props.pageOption)

    // 开启表格伸缩列
    props.dragColEnable && useDragCol(props.columns)

    const state = reactive({
      expandItemRefs: {},
      customRow: () => ({} as TableProps['customRow']),
      tableData: [] as any[], // 表格数据
      actions:
        props.columns.find((item) => [item.dataIndex, item.key].includes('action'))?.actions || [], // 表格操作（如：编辑、删除的按钮等）
      loading: false // 表格加载
    })

    // 如果外界设置了dataSource，那就直接用外界提供的数据
    watch(
      () => props.dataSource,
      (val) => {
        if (val) {
          state.tableData = val
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    /**
     * @param {object} params 表格查询参数
     * @param {boolean} flush 是否将页数重置到第一页
     * @description 获取表格数据
     */
    const refreshTableData = async (params = {}, flush = false) => {
      // 如果用户没有提供dataSource并且getListFunc是一个函数，那就进行接口请求
      if (
        Object.is(props.dataSource, undefined) &&
        Object.prototype.toString.call(props.getListFunc).includes('Function')
      ) {
        const queryParams = {
          pageNumber: flush ? 1 : pageOptions.value.current,
          pageSize: pageOptions.value.pageSize,
          ...props.pageOption,
          ...params
        }
        state.loading = true
        const { data, pageNumber, pageSize, total } = await props
          ?.getListFunc?.(queryParams)
          .finally(() => (state.loading = false))
        Object.assign(pageOptions.value, {
          current: ~~pageNumber,
          pageSize: ~~pageSize,
          total: ~~total
        })
        state.tableData = data
        console.log('🚀 ~ file: dynamic-table.vue ~ line 227 ~ refreshTableData ~ data', data)
      }

      // const end = Math.max(pageSize, current * pageSize)
      // .slice(end - pageSize, end) // 这里0，10是条数

      // 是否开启了合计行
      if (props.showSummary) {
        const { pageSize, current } = pageOptions.value
        const end = Math.max(pageSize, current * pageSize)

        const data = Object.is(props.dataSource, undefined)
          ? state.tableData
          : state.tableData.slice(end - pageSize, end)

        setCalculateRow({
          columns: props.columns,
          dataSource: data,
          tableRef,
          sumText: props.sumText,
          summaryFunc: props.summaryFunc
        })
      }
      // 是否可以拖拽行
      props.dragRowEnable && (state.customRow = useDragRow<any>(state.tableData)!)
    }

    refreshTableData()

    // 操作事件
    const actionEvent = async (record, func, actionType = '') => {
      try {
        // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
        await func({ record, props }, () => setTimeout(refreshTableData))
        // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
        if (actionType == 'del' && state.tableData.length < 2) {
          pageOptions.value.current = Math.max(1, pageOptions.value.current - 1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * @description 分页改变
     */
    const paginationChange: (...args: any[]) => any = (
      pagination,
      filters,
      sorter,
      { currentDataSource }
    ) => {
      const { field, order } = sorter

      pageOptions.value = {
        ...pageOptions.value,
        ...pagination
      }
      refreshTableData({
        pageSize: pagination.pageSize,
        pageNumber: pagination.current,
        ...props.pageOption,
        ...filters,
        field,
        order
      })
      emit('change', pagination, filters, sorter, { currentDataSource })
    }

    // dataIndex 可以为 a.b.c
    // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

    const buttonProps = {
      size: 'small'
    }

    return {
      ...toRefs(state),
      tableRef,
      pageOptions,
      buttonProps,
      actionEvent,
      refreshTableData,
      paginationChange
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.ant-table .ant-table-title) {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}

.actions > * {
  margin-right: 10px;
}
</style>
