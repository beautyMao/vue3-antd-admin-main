<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加</a-button>

  <a-table
    :columns="columns"
    :data-source="tableData"
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
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'

import { sentencePublishList } from '@/api/system/sentence'

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
    const handleAdd = () => {
      router.push('/add-sentence')
    }

    const editItem = (sentencePublishId) => {
      router.push({ path: '/add-sentence', query: { id: sentencePublishId } })
    }
    const deleteItem = (sentencePublishId) => {
      console.log(sentencePublishId)
    }
    // const tableData = reactive({
    //   theme: '',
    //   keyWord: '',
    //   category: ''
    // })

    const tableData = ref()

    onMounted(async () => {
      /**
       * @description 加载表格数据
       */
      const { code, msg, rows, total } = await sentencePublishList()
      if (code == '200') {
        tableData.value = rows
      } else {
        message.warning(msg)
      }
    })
    return {
      columns,
      tableData,
      handleAdd,
      editItem,
      deleteItem
    }
  }
})
</script>

<style lang="scss" scoped></style>
