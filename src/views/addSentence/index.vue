<template>
  <a-form
    :loading="loading"
    v-if="canShow"
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-spin :spinning="loading">
      <a-form-item label="主题" name="theme">
        <a-input v-model:value="formState.theme" />
      </a-form-item>

      <a-form-item
        label="关键字"
        name="keyWord"
        :rules="{
          required: true,
          message: '请输入关键字',
          trigger: 'blur'
        }"
      >
        <a-input v-model:value="formState.keyWord" />
      </a-form-item>

      <a-form-item
        label="类别"
        name="category"
        :rules="{
          required: true,
          message: '请选择类别',
          type: 'array',
          trigger: 'select'
        }"
      >
        <a-cascader
          v-model:value="formState.category"
          :options="categoryOptions"
          :load-data="loadCategoryData"
          placeholder=""
          change-on-select
        />
      </a-form-item>

      <div v-for="(item, index) in formState.sentenceLibrary" :key="index">
        <a-form-item
          v-bind="wrapperCol"
          label="语句库"
          :name="['sentenceLibrary', index, 'sentenceLibraryName']"
          :rules="{
            required: true,
            message: '请输入语句库',
            trigger: 'blur'
          }"
        >
          <a-input
            v-model:value="item.sentenceLibraryName"
            style="width: 100%; margin-right: 8px"
          />
          <div class="btn-box">
            <a-button type="button" style="margin-right: 8px" @click="addSentenceLibrary(index)"
              >添加</a-button
            >
            <a-button type="button" @click="removeSentenceLibrary(index)">删除</a-button>
          </div>
        </a-form-item>

        <a-form-item label="原文标题" :name="['sentenceLibrary', index, 'originalTitle']">
          <a-input v-model:value="item.originalTitle" />
        </a-form-item>

        <a-form-item label="原文链接" :name="['sentenceLibrary', index, 'originalLink']">
          <a-input v-model:value="item.originalLink" />
        </a-form-item>

        <a-form-item
          v-for="(s, i) in item.sentence"
          :key="i"
          label="语句"
          :name="['sentenceLibrary', index, 'sentence', i, 'sentenceContent']"
          :rules="{
            required: true,
            message: '请输入语句',
            trigger: 'blur'
          }"
        >
          <a-textarea v-model:value="s.sentenceContent" style="width: 100%; margin-right: 8px" />
          <div class="btn-box">
            <a-button type="button" style="margin-right: 8px" @click="addSentenContent(index, i)"
              >添加</a-button
            >
            <a-button type="button" @click="removeSentenceContent(index, i)">删除</a-button>
          </div>
        </a-form-item>
      </div>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">确认</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">重新编辑</a-button>
      </a-form-item>
    </a-spin>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, onUnmounted, ref, onMounted, watch, unref, inject } from 'vue'
import { Cascader, Spin, message } from 'ant-design-vue'
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { stOptions } from '@/mock/index'

import {
  sentencePublish,
  getSentencePublish,
  putSentencePublish,
  getSystemDict,
  getSystemDictById
} from '@/api/system/sentence'

interface sentence_library {
  value: string
  key: number
}

const initFormData = {
  theme: '',
  keyWord: '',
  category: '',
  sentenceLibrary: [
    {
      sentenceLibraryName: '',
      originalLink: '',
      originalTitle: '',
      sentence: [{ sentenceContent: '' }]
    }
  ]
}
const initFormDataString = {
  theme: '',
  keyWord: '',
  category: '',
  sentenceLibrary: [
    {
      sentenceLibraryName: '',
      originalLink: '',
      originalTitle: '',
      sentence: [{ sentenceContent: '' }]
    }
  ]
}

export default defineComponent({
  components: {
    [Cascader.name]: Cascader,
    [Spin.name]: Spin,
    MinusCircleOutlined
  },
  setup() {
    const formRef = ref<any>(null)
    const loading = ref(false)
    const route = useRoute()
    const editId = ref()
    const categoryOptions: any = reactive([])
    const canShow = ref(true)
    const reload: any = inject('reload')

    onUnmounted(() => {
      console.log('onUnmounted===🚀===>卸载组件了')
    })

    const formState = reactive(initFormData)

    const loadCategoryData = (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      getSystemDictById(targetOption.value).then((res) => {
        const list = res.data.map((item) => {
          return {
            label: item.dictLabel,
            value: item.dictLabel
          }
        })
        targetOption.loading = false
        targetOption.children = list
      })
    }

    const onSubmit = () => {
      formRef
      formRef.value
        .validate()
        .then(async () => {
          let res
          if (editId.value) {
            res = await putSentencePublish({ sentencePublishId: editId.value, ...formState })
          } else {
            res = await sentencePublish(formState)
          }

          if (res.code == 200) {
            message.success(res.msg, 10)
            reload()
          } else {
            message.error(res.msg, 10)
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    const removeSentenceLibrary = (index) => {
      if (index !== 0) {
        formState.sentenceLibrary.splice(index, 1)
      }
    }
    const addSentenceLibrary = () => {
      formState.sentenceLibrary.push({
        sentenceLibraryName: '',
        originalLink: '',
        originalTitle: '',
        sentence: [{ sentenceContent: '' }]
      })
    }
    const resetForm = () => {
      const newData = JSON.parse(JSON.stringify(initFormDataString))
      Object.assign(formState, newData)
    }
    const addSentenContent = (index, i) => {
      formState.sentenceLibrary[index].sentence.push({ sentenceContent: '' })
    }
    const removeSentenceContent = (index, i) => {
      if (i !== 0) {
        formState.sentenceLibrary[index].sentence.splice(i, 1)
      }
    }

    watch(
      () => route.query.id,
      (newVal) => {
        if (!route.query.id) {
          const newData = JSON.parse(JSON.stringify(initFormDataString))
          Object.assign(formState, initFormDataString)
        }
      }
    )
    onMounted(async () => {
      /**
       * @description 编辑或者新增
       */
      let categoryVal
      let routerId = route.query.id
      if (routerId) {
        console.log('route.query.id===🚀===>', routerId)
        editId.value = routerId
        loading.value = true
        const { code, msg, data = {} } = (await getSentencePublish(routerId)) || {}
        console.log('code===🚀===>', code)
        loading.value = false

        if (code == 200) {
          const { theme, keyWord, category = [], sentenceLibrary } = data
          formState.theme = theme
          formState.keyWord = keyWord
          formState.category = category
          formState.sentenceLibrary = sentenceLibrary
          categoryVal = category
        } else {
          message.error(msg)
        }
      } else {
        formRef.value.resetFields()
      }
      // 类别加载选项
      loading.value = true
      const { code, msg, data } = (await getSystemDict()) || {}
      loading.value = false
      if (code == 200) {
        let child
        // 获取子类
        if (routerId && categoryVal?.[0]) {
          const {
            code: code2,
            msg: msg2,
            data: data2
          } = (await getSystemDictById(categoryVal[0])) || {}
          if (code2 == 200) {
            child =
              data2?.length > 0 &&
              data2.map((item) => {
                return {
                  label: item?.dictLabel,
                  value: item?.dictLabel
                }
              })
          } else {
            message.error(msg2)
          }
        }
        const list =
          data.length > 0 &&
          data?.map((item) => {
            if (item.dictLabel == formState.category[0]) {
              return {
                value: item.dictLabel,
                label: item.dictLabel,
                isLeaf: false,
                children: child
              }
            } else {
              return {
                value: item.dictLabel,
                label: item.dictLabel,
                isLeaf: false
              }
            }
          })
        Object.assign(categoryOptions, list)
      } else {
        message.error(msg)
      }
    })

    return {
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      canShow,
      formState,
      onSubmit,
      categoryOptions,
      loadCategoryData,
      addSentenceLibrary,
      removeSentenceLibrary,
      addSentenContent,
      removeSentenceContent,
      formRef,
      loading,
      resetForm
    }
  }
})
</script>
<style lang="scss" scoped>
.btn-box {
  position: absolute;
  top: 0;
  right: -160px;
}
</style>
