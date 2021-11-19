<template>
  <dynamic-table
    ref="tableRef"
    :columns="columns"
    :get-list-func="loadData"
    rowKey="id"
    :row-selection="rowSelection"
  >
    <template #title>
      <a-button type="primary" @click="addItem"> 添加 </a-button>
      <a-button
        v-permission="{ action: 'delete' }"
        :disabled="isDisabled"
        type="primary"
        @click="deleteItems"
      >
        删除
      </a-button>
    </template>
  </dynamic-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { DynamicTable } from '@/components/dynamic-table'
import { delAdminAccount, getAdminAccount, postAdminAccount } from '@/api/system/account'
import { getPublishList } from '@/api/system/information-release'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'

export default defineComponent({
  name: 'Sentence',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<InstanceType<typeof DynamicTable>>()

    const state = reactive({
      queryParam: {
        // 表格查询参数
        name: '',
        status: '',
        startDate: '',
        endDate: ''
      } as any,
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys
        },
        selectedRowKeys: []
      }
    })

    /**
     * @description 加载表格数据
     */
    const loadData = () => {
      return getPublishList()
    }

    // 删除多项
    const deleteItems = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await delAdminAccount(state.rowSelection.selectedRowKeys.toString())
          tableRef.value?.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加账号
    const addItem = () => {
      useFormModal({
        title: '添加语句',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          const { username, password, roles } = modelRef

          const params = {
            username,
            password,
            roles: roles.toString()
          }
          await postAdminAccount(params)
          tableRef.value?.refreshTableData()
        }
      })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      columns,
      tableRef,
      isDisabled,
      loadData,
      addItem,
      deleteItems
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 100%;
  height: calc(100vh - 280px);
  flex-direction: column;

  img {
    min-height: 0;
    flex: 1;
  }

  .ant-form {
    flex: 2;
  }
}
</style>
