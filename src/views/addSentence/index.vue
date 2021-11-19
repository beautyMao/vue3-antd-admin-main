<template>
  <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
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

    <!-- <a-form-item
      label="类别"
      name="category"
      :rules="{
        required: true,
        message: '请选择类别',
        type: 'array',
        trigger: 'select'
      }"
    >
      <a-cascader v-model:value="formState.category" :options="stOptions" />
    </a-form-item> -->

    <a-form-item
      label="类别"
      name="category"
      :rules="{
        required: true,
        message: '请输入类别',
        trigger: 'blur'
      }"
    >
      <a-input v-model:value="formState.category" />
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
        <a-input v-model:value="item.sentenceLibraryName" style="width: 100%; margin-right: 8px" />
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
        v-for="(s, i) in item.sententce"
        :key="i"
        :label="'语句' + (i + 1)"
        :name="['sentenceLibrary', index, 'sententce', i, 'sentenceContent']"
        :rules="{
          required: i == 0 ? true : false,
          message: '请输入语句',
          trigger: 'blur'
        }"
      >
        <a-input v-model:value="s.sentenceContent" style="width: 100%; margin-right: 8px" />
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
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { Cascader, message } from 'ant-design-vue'
import { MinusCircleOutlined } from '@ant-design/icons-vue'

import { stOptions } from '@/mock/index'
import { sentencePublish } from '@/api/system/sentence'

interface sentence_library {
  value: string
  key: number
}

export default defineComponent({
  components: {
    [Cascader.name]: Cascader,
    MinusCircleOutlined
  },
  setup() {
    const formRef = ref()
    const formState = reactive({
      theme: '',
      keyWord: '',
      category: '',
      sentenceLibrary: [
        {
          sentenceLibraryName: '',
          originalLink: '',
          originalTitle: '',
          sententce: [{ sentenceContent: '' }, { sentenceContent: '' }]
        }
      ]
    })

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          console.log('values', JSON.stringify(formState))
          const { code, msg } = await sentencePublish(formState)
          if (code == 200) {
            message.success(msg, 10)
          } else {
            message.error(msg, 10)
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
    const addSentenceLibrary = (item) => {
      formState.sentenceLibrary.push({
        sentenceLibraryName: '',
        originalLink: '',
        originalTitle: '',
        sententce: [{ sentenceContent: '' }, { sentenceContent: '' }]
      })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }
    const addSentenContent = (index, i) => {
      formState.sentenceLibrary[index].sententce.push({ sentenceContent: '' })
    }
    const removeSentenceContent = (index, i) => {
      if (i !== 0) {
        formState.sentenceLibrary[index].sententce.splice(i, 1)
      }
    }

    return {
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      stOptions,
      addSentenceLibrary,
      removeSentenceLibrary,
      addSentenContent,
      removeSentenceContent,
      formRef,
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
