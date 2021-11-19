import http from '@/utils/http/axios'
import { LoginParams, LoginResultModel } from './model/userModel'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Storage } from '@/utils/Storage'
const token = Storage.get(ACCESS_TOKEN)

/**
 * @description: 信息发布新增
 */
export function sentencePublish(params) {
  return http.request({
    url: '/sentence/publish',
    method: 'POST',
    headers: {
      Authorization: token
    },
    params
  })
}

/**
 * @description: 信息发布新增
 */
export function sentencePublishList() {
  return http.request({
    url: '/sentence/publish/list',
    method: 'get',
    headers: {
      Authorization: token
    }
  })
}
/**
 * @description: 获取token
 */
export function getToken() {
  return http.request({
    url: '/token',
    method: 'get'
  })
}
