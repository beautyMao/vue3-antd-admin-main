<template>
  <div class="flex-box">
    <a-textarea v-model:value="value" :auto-size="{ minRows: 2, maxRows: 5 }" />

    <a-button type="primary" @click="analysisBtn('+')">+</a-button>
    <a-button type="primary" @click="analysisBtn('-')">-</a-button>
  </div>
  <div class="content-list">
    <ul v-for="(item, index) in list" :key="index">
      <li class="title">
        <div v-for="(title, i) in item.title" :key="i">
          <span>{{ title }}</span
          ><span v-if="i != item.title.length - 1"> ></span>
        </div>
      </li>
      <li v-for="(url, i) in item.urlList" :key="i">
        <a :href="url.url">{{ url.text }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { getToken } from '@/api/system/user'
import { postAnalysis } from '@/api/system/home'

import { Storage } from '@/utils/Storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const token = Storage.get(ACCESS_TOKEN)

const list = [
  {
    title: ['主页', '文化', '人物'],
    urlList: [
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' }
    ]
  },
  {
    title: ['主页', '文化', '人物'],
    urlList: [
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' }
    ]
  },
  {
    title: ['主页', '文化', '人物'],
    urlList: [
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' }
    ]
  },
  {
    title: ['主页', '文化', '人物'],
    urlList: [
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' },
      { url: 'www.baidu.com', text: 'Whatever is worth doing is worth doing well.' }
    ]
  }
]

type StepType = '+' | '-'

export default defineComponent({
  components: {},
  setup() {
    let value = ref<string>('')

    const analysisBtn = (step: StepType) => {
      postAnalysis({ sentence: value.value, step, token }).then((res) => {
        const newVal = res?.data?.afterAnalysisSentence || ''
        value.value = newVal
      })
    }

    return {
      value,
      analysisBtn,
      list
    }
  }
})
</script>
<style lang="scss" scoped>
textarea {
  max-width: 600px;
}
.flex-box {
  align-items: center;
  display: flex;

  button {
    margin-left: 20px;
  }
}
.content-list {
  width: 100%;
  margin-top: 30px;

  ul,
  li {
    list-style: none;
  }
  ul {
    width: 50%;
    display: inline-block;

    li {
      margin-bottom: 10px;
    }
    .title {
      div {
        display: inline-block;
      }
    }
  }
}
</style>
