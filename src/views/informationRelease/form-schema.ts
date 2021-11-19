import { getAdminRole } from '@/api/system/role'
import { createVNode } from 'vue'
import SelectTree from './components/select-tree.vue'
import AddListForm from './components/add-list-form.vue'

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
  formItem: [
    {
      type: 'select',
      label: '主题',
      field: 'theme',
      value: '',
      props: {
        placeholder: '请选择主题'
      },
      options: [{ label: '1', value: 'd' }],
      rules: [
        {
          required: true,
          message: '主题不能为空'
        }
      ]
    },
    {
      type: 'input',
      label: '关键字',
      field: 'keyWord',
      hidden: false, // 是否隐藏
      value: '',
      props: {
        placeholder: '请输入关键字'
      },
      rules: [
        {
          required: false
        }
      ]
    },
    {
      type: createVNode(SelectTree),
      label: '类别',
      field: 'category',
      value: ''
    },
    {
      type: createVNode(AddListForm),
      label: '语句库',
      field: 'sentenceLibrary',
      value: ''
    }
  ]
})
