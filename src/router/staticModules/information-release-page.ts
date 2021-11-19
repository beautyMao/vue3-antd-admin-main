import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/information-release-page',
    name: 'InformationReleasePage',
    meta: {
      title: '信息发布页',
      icon: 'icon-zhuomian'
    },
    component: () =>
      import(/* webpackChunkName: "demos-button" */ '@/views/informationRelease/index.vue')
  }
]

export default routes
