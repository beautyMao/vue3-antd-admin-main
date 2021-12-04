<template>
  <div class="box">
    <s-header />
    <s-analy :listVal="listVal" />
    <div class="content">
      <div class="left">
        <s-table :tableList="tableList" @goPage="goPage" @setSen="setSen" />
      </div>
      <!-- <div class="right">预留广告位</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'

import sHeader from './components/header.vue'
import sAnaly from './components/analy.vue'
import sTable from './components/table.vue'
import { getSentenceLatestRelease, getSentenceLatestReleaseById } from '@/api/system/home'

export default defineComponent({
  components: { sHeader, sAnaly, sTable },
  setup() {
    let tableList = reactive([])
    let listVal = ref('')

    getSentenceLatestRelease().then((res) => {
      const { data } = res
      Object.assign(tableList, data)
    })
    // todo  轮询 每五分钟调用接口 关闭页面时卸载轮询
    // 默认选项

    // setInterval(() => {
    //   getSentenceLatestReleaseCategory().then((res) => {
    //     Object.assign(tableList, [])
    //     const { data } = res
    //     Object.assign(tableList, data)
    //   })
    // }, 500)

    const goPage = (id) => {
      getSentenceLatestReleaseById(id).then((res) => {
        console.log(res)
      })
    }
    const setSen = (res) => {
      listVal.value = res
    }

    return {
      goPage,
      setSen,
      tableList,
      listVal
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
