import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'

const routeName = 'demos'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: routeName,
    redirect: '/demos/custom-a-custom-modal',
    component: RouterTransition,
    meta: {
      title: 'demo演示',
      icon: 'icon-zhuomian'
    },
    children: [
      {
        path: 'custom-a-custom-modal',
        name: `${routeName}-custom-modal`,
        meta: {
          title: '自定义模态框',
          icon: 'icon-zhuomian',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/shared/demos/custom-modal.vue'
          )
      },
      {
        path: 'button',
        name: `${routeName}-button`,
        meta: {
          title: '按钮的扩展',
          icon: 'icon-zhuomian',
          keepAlive: true
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/button.vue')
      },
      {
        path: 'form',
        name: `${routeName}-form`,
        meta: {
          title: '验证表单',
          icon: 'icon-zhuomian',
          keepAlive: true
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/form/rule-form.vue')
      },
      {
        path: 'summary-table',
        name: `${routeName}-summary-table`,
        meta: {
          title: '合计表格',
          icon: 'icon-zhuomian',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "summary-table" */ '@/views/shared/demos/tables/summary-table/index.vue'
          )
      },
      {
        path: 'icons',
        name: `${routeName}-icons`,
        meta: {
          title: '自定义图标',
          icon: 'icon-zhuomian',
          keepAlive: true
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/shared/demos/icons/Iconfont.vue')
      }
    ]
  }
]

export default routes
