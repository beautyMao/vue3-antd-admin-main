<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <!--      网站logo start-->
      <logo :collapsed="collapsed" />
      <!--      网站logo end-->
      <!--      侧边菜单栏start-->
      <aside-menu :collapsed="collapsed" />
      <!--      侧边菜单栏end-->
    </a-layout-sider>
    <a-layout>
      <!--      页头 start-->
      <page-header v-model:collapsed="collapsed" />
      <!--      页头end-->
      <!--      内容区域start-->
      <a-layout-content class="layout-content">
        <div class="tabs-view-content">
          <a-card>
            <router-view v-slot="{ Component }" v-if="isRouterAlive">
              <!-- <keep-alive> -->
              <component :is="Component" />
              <!-- </keep-alive> -->
            </router-view>
          </a-card>
        </div>
      </a-layout-content>
      <!--      内容区域end-->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, provide, nextTick } from 'vue'
import { Layout } from 'ant-design-vue'
import Logo from './logo/index.vue'
import { TabsView } from './tabs'
import AsideMenu from './menu/menu.vue'
import PageHeader from './header/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    TabsView,
    PageHeader,
    AsideMenu,
    Logo,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider
  },
  setup() {
    const collapsed = ref<boolean>(false)

    const isRouterAlive = ref(true)
    const reload = () => {
      console.log('刷新')
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload) // provide的第一个为名称，第二个值为所需要传的参数

    // 自定义侧边栏菜单收缩和展开时的宽度
    const asiderWidth = computed(() => (collapsed.value ? 80 : 228))

    return {
      collapsed,
      asiderWidth,
      isRouterAlive
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: scroll;

  .ant-layout {
    overflow: scroll;
  }

  .layout-content {
    flex: none;
  }
}
</style>
