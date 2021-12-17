<template>
  <div class="box">
    <s-header />
    <s-analy :listVal="listVal" />
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
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

import sHeader from './components/header.vue'
import sAnaly from './components/analy.vue'
import sTable from './components/table.vue'
import { getSentenceLatestRelease, getSentenceLatestReleaseById } from '@/api/system/home'

export default defineComponent({
  components: { sHeader, sAnaly, sTable },

  setup() {
    const tableList = reactive([])
    const listVal = ref('')
    const router = useRouter()

    const loading = ref(false)
    const getSentenceData = async () => {
      loading.value = true
      Object.assign(tableList, [])
      const { data, code, msg } = await getSentenceLatestRelease()
      loading.value = false
      if (code == 200) {
        Object.assign(tableList, data)
      } else {
        message.error(msg)
      }
    }

    let timer
    onMounted(() => {
      getSentenceData()
      // 轮询 每五分钟调用接口 关闭页面时卸载轮询
      timer = setInterval(() => getSentenceData(), 300000)
    })
    //关闭页面时卸载轮询
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null
    })

    const goPage = (id) => {
      router.push({ path: '/homesecond', query: { id: id } })
    }
    const setSen = (res) => {
      listVal.value = res
    }

    return {
      goPage,
      setSen,
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
