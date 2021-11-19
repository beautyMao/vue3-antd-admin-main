import { useCreateModal } from '@/hooks'
import OperateModal from './operate-modal.vue'
import { delAdminAccess } from '@/api/system/access'
import { formatDate } from '@/utils/common'
import { message } from 'ant-design-vue'

export const columns: TableColumn[] = [
  // 资源管理
  {
    title: '语句编号',
    dataIndex: 'sentenceNumber'
  },
  {
    title: '语句内容',
    dataIndex: 'sentenceContent'
  },
  {
    title: '字数统计',
    dataIndex: 'wordCount'
  },
  {
    title: '语法树',
    dataIndex: 'syntaxTree'
  },
  {
    title: '访问次数',
    dataIndex: 'visitNumber'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    slots: {
      customRender: 'action'
    },
    actions: [
      {
        type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
        text: '删除',
        permission: {
          // 权限
          action: 'delete', // 删除权限
          effect: 'disabled' // 没有权限时禁用按钮，不传effect则不显示按钮
        },
        props: {
          type: 'danger' // 按钮类型
        },
        func: ({ record }, refreshTableData) => {
          // 点击删除的回调
          if (record.id < 6) {
            return message.warn('系统预置菜单，不能删除！')
          }
          return delAdminAccess(record.id).then(() => refreshTableData())
        }
      },
      {
        type: 'button', // 控制类型，默认为a,可选： select | button | text
        text: '编辑',
        permission: {
          // 权限
          action: 'update',
          effect: 'disabled'
        },
        props: {
          type: 'warning' // 按钮类型
        },
        func: ({ record }, callback) =>
          useCreateModal(OperateModal, {
            // 点击删除的回调
            fields: record,
            callback
          })
      }
    ]
  }
]
