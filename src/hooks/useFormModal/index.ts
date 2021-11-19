// create-api.ts
import { App, createVNode, render, VNode } from 'vue'
import FormModal from './form-modal.vue'

interface ModalInstance {
  remove(): void
  $updateProps(props: any): void
}

interface Options {
  handleOk: (modelRef: any, state) => Promise<any> // 点击提交表单
  formSchema: FormSchema // 表单描述属性
  fields?: object // 字段默认填充值，一般编辑表单是传入
  hiddenFields?: string[] // 需要隐藏的表单项
  [key: string]: any
}

let _app

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const useFormModal = (options: Options): VNode<ModalInstance> => {
  // 组件实例
  let formModal
  const container = document.createElement('div')
  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }
  formModal = createVNode(FormModal, { ...options, remove })
  // 使当前模态框继承App实例上下文
  _app && (formModal.appContext = _app._instance?.appContext)
  render(formModal, container)
  return formModal
}

// 暴露一个插件 API
const install = (app: App) => {
  _app = app
}
export default install
