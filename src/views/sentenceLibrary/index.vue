<template>
  <!-- <div style="margin-bottom: 30px">
    <a-input
      v-model:value="searchVal"
      placeholder="请输入主题、关键字、发布者"
      style="width: 50%; margin-right: 10px"
    />
    <a-button class="editable-add-btn" @click="handleSearch">搜索</a-button>
  </div> -->
  <div style="margin-bottom: 30px">
    <a-button class="editable-add-btn" style="margin-right: 10px" @click="handleAdd">添加</a-button>
    <a-button class="editable-add-btn" @click="handleDel">删除</a-button>
  </div>
  <a-table
    ref="tableRef"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, onSelectAll }"
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="false"
    :scroll="{ x: 1500, y: 300 }"
    rowKey="sentencePublishId"
  >
    <template #category="{ text }">
      <span v-for="(item, i) in text" :key="i"
        >{{ item }} <i v-if="i != text.length - 1">/</i></span
      >
    </template>
    <template #action="{ record }">
      <a-button type="primary" style="margin-right: 8px" @click="editItem(record.sentencePublishId)"
        >编辑</a-button
      >
      <a-button type="primary" @click="deleteItem(record.sentencePublishId)">删除</a-button>
    </template>
    <template #expandedRowRender="{ record }">
      <!-- {{ record.keyWord }} -->
      <div v-for="(item, i) in record.sentenceLibrary" :key="i">
        <div>语句库： {{ item.sentenceLibraryName }}</div>
        <div v-for="(sent, ii) in item.sentence.slice(0, 5)" :key="ii" style="margin-left: 20px">
          语句{{ ii + 1 }} : {{ sent.sentenceContent }} 访问次数 : {{ record.visitNumber }}
        </div>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, createVNode, onMounted, ref, inject, reactive, toRefs } from 'vue'
import { message, Modal, Input } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import { sentencePublishList, delSentencePublish } from '@/api/system/sentence'

import { data } from '@/mock/sentenceL.js'

interface DataItem {
  theme: string
  keyWord: string
  category: Array<string>
  publishBy: string
  publishTime: string
  visitNumber: number
  createBy: string
  createTime: string
  sentencePublishId: string
}
const columns = [
  {
    title: '主题',
    dataIndex: 'theme',
    width: 150,
    fixed: 'left',
    key: 'theme'
  },
  { title: '关键字', dataIndex: 'keyWord', key: 'keyWord', width: 150, fixed: 'left' },
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
    width: 150,
    slots: { customRender: 'category' }
  },
  { title: '发布者', dataIndex: 'publishBy', width: 150, key: 'publishBy' },
  {
    title: '发布日期',
    dataIndex: 'publishTime',
    width: 150,
    key: 'publishTime',
    sorter: (a, b) => {
      if (a.publishTime == null) {
        return false
      }
      return a.publishTime - b.publishTime ? 1 : -1
    }
  },
  { title: '访问次数', width: 150, dataIndex: 'visitNumber', key: 'visitNumber' },
  { title: '创建人', width: 150, dataIndex: 'createBy', key: 'createBy' },
  {
    title: '创建时间',
    width: 150,
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: (a, b) => {
      if (a.createTime == null) {
        return false
      }
      return a.createTime - b.createTime ? 1 : -1
    }
  },
  {
    title: '修改时间',
    width: 150,
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: (a, b) => {
      if (a.updateTime == null) {
        return false
      }
      return a.updateTime - b.updateTime ? 1 : -1
    }
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    slots: { customRender: 'action' },
    fixed: 'right',
    width: 200
  }
]

export default defineComponent({
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const loading = ref(false)
    const reload: any = inject('reload')
    const searchVal = ref('')

    const handleAdd = () => {
      router.push('/add-sentence')
    }

    const editItem = (sentencePublishId) => {
      router.push({ path: '/add-sentence', query: { id: sentencePublishId } })
    }

    const deleteItem = (sentencePublishId) => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          const { code, msg } = await delSentencePublish(sentencePublishId)
          if (code != 200) {
            message.error(msg)
          }
          reload()
        }
      })
    }

    const handleSearch = async () => {}

    const refreshTableData = async () => {
      loading.value = true
      const { code, msg, rows, total } = await sentencePublishList()
      loading.value = false
      if (code == '200') {
        tableData.value = rows
      } else {
        message.warning(msg)
      }
    }
    const selectedRowKeys = reactive([])
    const onSelectChange = (newSelectedRowKeys) => {
      Object.assign(selectedRowKeys, newSelectedRowKeys)
    }

    const onSelectAll = (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
      if (selected) {
        const selectId = selectedRows.map((item) => item.sentencePublishId)
        console.log('selectId===🚀===>', selectId)
        Object.assign(selectedRowKeys, selectId)
      } else {
        selectedRowKeys.length = 0
      }
    }

    const handleDel = () => {
      if (selectedRowKeys.length == 0) {
        return false
      }
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          const { code, msg } = await delSentencePublish(selectedRowKeys)
          if (code != 200) {
            message.error(msg)
          }
          reload()
        }
      })
    }

    const tableData = ref()

    onMounted(async () => {
      /**
       * @description 加载表格数据
       */
      loading.value = true
      const { code, msg, rows, total } = await sentencePublishList()
      loading.value = false
      if (code == '200') {
        tableData.value = rows
      } else {
        message.warning(msg)
      }
    })

    return {
      columns,
      tableData,
      loading,
      handleAdd,
      editItem,
      deleteItem,
      tableRef,
      handleDel,
      selectedRowKeys,
      onSelectChange,
      onSelectAll,
      searchVal,
      handleSearch
    }
  }
})
</script>

<style lang="scss" scoped></style>
