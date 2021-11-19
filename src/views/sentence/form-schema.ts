import { getAdminRole } from '@/api/system/role'
import { createVNode } from 'vue'

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
  formItem: [
    {
      type: 'textarea',
      label: '语句内容',
      field: 'sentenceContent',
      value: ''
    }
  ]
})
