<template>
  <div class="header">
    <!-- <div class="kong">预留广告位</div> -->
    <img src="~@/assets/analysis.svg" class="logo" />
    <div class="login-box">
      <a-button style="margin-right: 20px" @click="goLogin"> 登录 </a-button>
      <a-button> 注册 </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const goLogin = () => {
      router.push('/login')
    }
    return { goLogin }
  }
})
</script>
<style lang="scss" scoped>
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
</style>
