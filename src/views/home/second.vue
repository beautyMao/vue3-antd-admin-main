<template>
  <div class="box">
    <s-header />

    <s-analy :listVal="listVal" />
    <div class="title" @click="goBack">首页--{{ cid }}</div>
    <div class="content">
      <div class="left">
        <s-table :loading="loading" :tableList="tableList" @goPage="goPage" @setSen="setSen" />
      </div>
      <!-- <div class="right">预留广告位</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, onBeforeUnmount, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

import sHeader from './components/header.vue'
import sAnaly from './components/analy.vue'
import sTable from './components/table.vue'

import { getSentenceLatestReleaseById } from '@/api/system/home'

export default defineComponent({
  components: { sHeader, sAnaly, sTable },
  setup() {
    let tableList = reactive([])
    let listVal = ref('')
    const route = useRoute()
    const cid = ref()
    const loading = ref(false)

    const goPage = (id) => {
      //三级页面是否有不确定
    }
    const setSen = (res) => {
      listVal.value = res
    }

    let timer
    onMounted(async () => {
      /**
       * @description 编辑或者新增
       */
      if (route.query.id) {
        cid.value = route.query.id
        loading.value = true
        const { code, msg, data } = await getSentenceLatestReleaseById(cid.value)
        loading.value = false
        if (code == 200) {
          Object.assign(tableList, data)
        } else {
          message.error(msg)
        }
      }

      // 轮询 每五分钟调用接口 关闭页面时卸载轮询
      timer = setInterval(async () => {
        loading.value = true
        Object.assign(tableList, [])
        const { data, code, msg } = await getSentenceLatestReleaseById(cid.value)
        loading.value = false
        if (code == 200) {
          Object.assign(tableList, data)
        } else {
          message.error(msg)
        }
      }, 50000)
    })

    //关闭页面时卸载轮询
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null
    })

    const goBack = () => {
      window.history.go(-1)
    }

    return {
      goPage,
      setSen,
      goBack,
      cid,
      tableList,
      listVal,
      loading
    }
  }
})
</script>
<style lang="scss" scoped>
.box {
  width: 980px;
  margin: 0 auto;
}
.title {
  cursor: pointer;
  font-size: 20px;
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
</style>
