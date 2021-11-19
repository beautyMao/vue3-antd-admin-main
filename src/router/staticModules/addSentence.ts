import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/add-sentence',
    name: 'addSentence',
    meta: {
      title: '新增语句页',
      icon: 'icon-yibiaopan'
    },
    component: () => import(/* webpackChunkName: "demos-button" */ '@/views/addSentence/index.vue')
  }
]

export default routes
