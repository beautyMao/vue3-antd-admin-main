<template>
  <div class="box">
    <div class="header">
      <!-- <div class="kong">预留广告位</div> -->
      <img src="~@/assets/analysis.svg" class="logo" />
      <div class="login-box">
        <a-button style="margin-right: 20px" @click="goLogin"> 登录 </a-button>
        <a-button> 注册 </a-button>
      </div>
    </div>
    <div class="content">
      <div class="left">
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
      </div>
      <!-- <div class="right">预留广告位</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { getTokenByHome } from '@/api/system/user'
import { postAnalysis } from '@/api/system/home'

import { Storage } from '@/utils/Storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Button from '@/components/button/button.vue'
import { useRouter } from 'vue-router'

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
  components: { Button },
  setup() {
    let value = ref<string>('')
    const router = useRouter()
    let homeToke = ''

    getTokenByHome().then((res) => {
      console.log(res)
      homeToke = res
    })

    const analysisBtn = (step: StepType) => {
      if (value.value == '') return false
      postAnalysis({ sentence: value.value, step, token: homeToke }).then((res) => {
        const newVal = res?.data?.afterAnalysisSentence || ''
        value.value = newVal
      })
    }

    const goLogin = () => {
      router.push('/login')
    }

    return {
      value,
      analysisBtn,
      list,
      goLogin
    }
  }
})
</script>
<style lang="scss" scoped>
.box {
  width: 980px;
  margin: 0 auto;
}
.header {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  .kong {
    border: 1px solid #000;
    width: 600px;
    height: 100px;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }
  .logo {
    width: 455px;
    height: 160px;
  }
}
.content {
  display: flex;
  justify-content: space-between;

  .right {
    border: 1px solid #000;
    font-size: 20px;
    text-align: center;
    width: 200px;
    height: 400px;
  }
}
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
    padding: 0;

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
