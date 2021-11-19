<template>
  <config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </config-provider>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
// import SuspenseWithError from '@/components/SuspenseWithError.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { ConfigProvider },
  setup() {
    const route = useRoute()
    const store = useStore()

    return {
      zhCN
    }
  }
})
</script>

<style lang="scss">
@import '~@/styles/global.scss';
@import '~@/styles/common.scss';
@import '~@/styles/override.scss';

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s ease-in;
}

.slide-up-enter-form,
.slide-up-leave-to {
  transform: translateY(-100%);
}
</style>
