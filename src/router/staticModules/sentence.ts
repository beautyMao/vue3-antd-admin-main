import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sentence-page',
    name: 'SentencePage',
    meta: {
      title: '语句页',
      icon: 'icon-yibiaopan'
    },
    component: () => import(/* webpackChunkName: "demos-button" */ '@/views/sentence/index.vue')
  }
]

export default routes
