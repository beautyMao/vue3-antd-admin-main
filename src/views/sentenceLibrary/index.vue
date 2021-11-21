<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加</a-button>

  <a-table
    ref="tableRef"
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="false"
    :rowKey="
      (record, index) => {
        return index
      }
    "
  >
    <template #action="{ record }">
      <a-button type="primary" style="margin-right: 8px" @click="editItem(record.sentencePublishId)"
        >编辑</a-button
      >
      <a-button type="primary" @click="deleteItem(record.sentencePublishId)">删除</a-button>
    </template>
    <template #expandedRowRender="{ record }">
      <!-- {{ record.keyWord }} -->
      <div v-for="(item, i) in record.sentenceLibrary" :key="i">
        语句库： {{ item.sentenceLibraryName }}
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, createVNode, onMounted, ref, onUpdated } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import { sentencePublishList, delSentencePublish } from '@/api/system/sentence'

import { data } from '@/mock/sentenceL.js'

const columns = [
  { title: '主题', dataIndex: 'theme', key: 'theme' },
  { title: '关键字', dataIndex: 'keyWord', key: 'keyWord' },
  { title: '类别', dataIndex: 'category', key: 'category' },
  { title: '发布者', dataIndex: 'publishBy', key: 'publishBy' },
  { title: '发布日期', dataIndex: 'publishTime', key: 'publishTime' },
  { title: '访问次数', dataIndex: 'visitNumber', key: 'visitNumber' },
  { title: '创建人', dataIndex: 'createBy', key: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '操作', dataIndex: '', key: 'x', slots: { customRender: 'action' } }
]

export default defineComponent({
  setup() {
    const router = useRouter()
    const tableRef = ref()
    const loading = ref(false)

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
          await refreshTableData()
          // state.rowSelection.selectedRowKeys = []
        }
      })
    }

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
      console.log('onMounted---')
    })

    onUpdated(() => {
      console.log('onUpdated---')
    })
    console.log('setup---')
    return {
      columns,
      tableData,
      loading,
      handleAdd,
      editItem,
      deleteItem,
      tableRef
    }
  }
})
</script>

<style lang="scss" scoped></style>
