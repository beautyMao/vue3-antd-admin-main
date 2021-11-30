<template>
  <ALayoutHeader class="layout-header">
    <div class="left-options"></div>
    <div class="right-options">
      <!--      切换全屏-->
      <!-- <component :is="fullscreenIcon" @click="toggleFullScreen" /> -->
      <Dropdown>
        <a-avatar>{{ username }}</a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div>个人中心</div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <div @click.prevent="doLogout"><poweroff-outlined /> 退出登录</div>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import components from '@/layout/header/components'
import { message, Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default defineComponent({
  name: 'PageHeader',
  components: { ...components },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  emits: ['update:collapsed'],
  setup() {
    const store = useStore()

    const state = reactive({
      fullscreenIcon: 'FullscreenOutlined'
    })

    const router = useRouter()
    const route = useRoute()

    const username = computed(() => store.getters['user/userInfo']?.username)

    // 退出登录
    const doLogout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: createVNode(QuestionCircleOutlined),
        onOk: () => {
          console.log(router, '退出登录')
          store.dispatch('user/logout').then((res) => {
            message.success('成功退出登录')
            // 移除标签页
            localStorage.removeItem(ACCESS_TOKEN)
            router
              .replace({
                name: 'login',
                query: {
                  redirect: route.fullPath
                }
              })
              .finally(() => location.reload())
          })
        }
      })
    }

    return {
      ...toRefs(state),
      username,
      doLogout
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  height: $header-height;
  padding: 0;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;

  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      padding: 0 24px;
      cursor: pointer;
    }
  }

  .right-options {
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
