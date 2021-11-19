<template>
  <a-modal
    v-model:visible="visible"
    :width="600"
    :title="Number.isInteger(fields.id) ? '编辑资源' : '新增资源'"
    :confirm-loading="confirmLoading"
    :afterClose="remove"
    @ok="handleOk"
  >
    <a-form ref="formRef" :model="modelRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="类别" :rules="rules.type" name="type">
        <a-select
          v-model:value="modelRef.type"
          :disabled="Number.isInteger(fields.id)"
          placeholder="请选择类型"
        >
          <a-select-option :value="1"> 模块 </a-select-option>
          <a-select-option :value="2"> 菜单 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="modelRef.type == 1"
        label="模块名称"
        :rules="rules.moduleName"
        name="moduleName"
      >
        <a-input
          v-model:value="modelRef.moduleName"
          :disabled="Number.isInteger(fields.id)"
          placeholder="请输入模块名称"
        />
      </a-form-item>
      <a-form-item
        v-if="modelRef.type == 2"
        label="模块名称"
        :rules="rules.moduleId"
        name="moduleId"
      >
        <a-select
          v-model:value="modelRef.moduleId"
          :disabled="Number.isInteger(fields.id)"
          placeholder="请选择模块"
        >
          <a-select-option v-for="item in moduleList" :key="item.id" :value="item.id">
            {{ item.moduleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="modelRef.type == 2"
        label="菜单名称"
        :rules="rules.actionName"
        name="actionName"
      >
        <a-input v-model:value="modelRef.actionName" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item
        label="文件路径"
        name="viewPath"
        :rules="[
          {
            required: modelRef.type == 2,
            message: '请输入页面对应的文件路径'
          }
        ]"
      >
        <a-select
          v-model:value="modelRef.viewPath"
          :allowClear="modelRef.type == 1"
          placeholder="请选择页面对应的文件路径"
        >
          <template v-for="(comp, path) in constantRouterComponents" :key="path">
            <a-select-option :value="path"> {{ path }} </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="路径" :rules="rules.url" name="url">
        <a-input v-model:value="modelRef.url" placeholder="请输入路径" />
      </a-form-item>
      <a-form-item label="小图标">
        <a-input v-model:value="modelRef.icon" placeholder="小图标" />
        <a :href="`${prefix}#/icons`" target="_blank">可选图标</a>
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number v-model:value="modelRef.sort" :min="1" placeholder="排序" />
      </a-form-item>
      <a-form-item label="keepAlive" name="keepAlive">
        <a-select v-model:value="modelRef.keepAlive" placeholder="是否缓存页面">
          <a-select-option :value="0"> 否 </a-select-option>
          <a-select-option :value="1"> 是 </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { Modal, Form, InputNumber, Input, Select } from 'ant-design-vue'
import { constantRouterComponents } from '@/router/modules'
import { ModuleItem } from '@/api/system/access/AccessModel'
import { postAdminAccess, getAdminAccessModule, patchAdminAccess } from '@/api/system/access'
const prefix = process.env.BASE_URL

interface IState {
  visible: boolean
  confirmLoading: boolean
  moduleList: ModuleItem[]
}

export default defineComponent({
  name: 'OperateModal',
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [InputNumber.name]: InputNumber,
    [Input.name]: Input,
    [Select.name]: Select,
    ASelectOption: Select.Option
  },
  props: {
    remove: {
      // 移除模态框
      type: Function
    },
    fields: {
      type: Object,
      default: () => ({})
    },
    callback: {
      type: Function
    }
  },
  setup(props) {
    const formRef = ref<any>(null)

    const state: IState = reactive({
      visible: true,
      confirmLoading: false,
      moduleList: []
    })
    const modelRef = reactive({
      moduleName: '',
      moduleId: undefined,
      actionName: '',
      viewPath: '',
      type: undefined as undefined | number,
      url: '',
      icon: '',
      sort: 1,
      keepAlive: 1
    })

    // 如果有moduleId,则为编辑操作
    if (props.fields.moduleId) {
      Object.keys(modelRef).forEach((key) => (modelRef[key] = props.fields[key]))
      modelRef.type = props.fields.moduleId == -1 ? 1 : 2
    }

    const rules = {
      moduleName: [
        {
          required: true,
          message: '模块名称不能为空'
        }
      ],
      moduleId: [
        {
          required: true,
          message: '模块名称不能为空'
        }
      ],
      actionName: [
        {
          required: true,
          message: '请输入菜单名称'
        }
      ],
      type: [
        {
          required: true,
          message: '请选择类型'
        }
      ],
      url: [
        {
          required: true,
          message: '请输入url地址'
        }
      ]
    }

    onMounted(async () => {
      // 获取模块列表
      state.moduleList = await getAdminAccessModule()
    })

    const handleOk = async (e) => {
      e.preventDefault()
      state.confirmLoading = true
      try {
        await formRef.value.validate()
        const id = props.fields.id
        const params = { ...modelRef }
        params.viewPath ??= ''
        id && Reflect.deleteProperty(params, 'type')
        await (id ? patchAdminAccess(id, params) : postAdminAccess(params)).finally(
          () => (state.confirmLoading = false)
        )
        state.visible = false
        props?.callback?.()
      } catch (error) {
        console.log('error', error)
        state.confirmLoading = false
      }
    }

    return {
      ...toRefs(state),
      formRef,
      rules,
      prefix,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      modelRef,
      constantRouterComponents,
      handleOk
    }
  }
})
</script>

<style scoped></style>
