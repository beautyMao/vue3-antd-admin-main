import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sentence-library',
    name: 'SentenceLibrary',
    meta: {
      title: '语句库',
      icon: 'icon-yibiaopan'
    },
    component: () =>
      import(/* webpackChunkName: "demos-button" */ '@/views/sentenceLibrary/index.vue')
  }
]

export default routes
