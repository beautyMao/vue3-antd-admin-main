import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'HomePage',
    meta: {
      title: '首页',
      icon: 'icon-shouye'
    },
    component: () => import(/* webpackChunkName: "demos-button" */ '@/views/home/index.vue')
  }
]

export default routes
