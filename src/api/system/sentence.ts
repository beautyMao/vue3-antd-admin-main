import http from '@/utils/http/axios'
import { LoginParams, LoginResultModel } from './model/userModel'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Storage } from '@/utils/Storage'
import { RequestEnum } from '@/enums/httpEnum'
const token = Storage.get(ACCESS_TOKEN)
enum Api {
  sentencePublish = '/sentence/publish'
}
/**
 * @description: 信息发布新增
 */
export function sentencePublish(params) {
  return http.request({
    url: '/sentence/publish',
    method: RequestEnum.POST,
    headers: {
      Authorization: token
    },
    params
  })
}

/**
 * @description:  信息发布查询 所有
 */
export function sentencePublishList() {
  return http.request({
    url: [Api.sentencePublish, 'list'].join('/'),
    method: RequestEnum.GET,
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
    method: RequestEnum.GET
  })
}

/**
 * -信息发布删除
 * @param params
 */
export function delSentencePublish(id: string) {
  return http.request({
    url: [Api.sentencePublish, id].join('/'),
    method: RequestEnum.DELETE,
    headers: {
      Authorization: token
    }
  })
}

/**
 * -信息发布查询 单个
 * @param params
 */
export function getSentencePublish(id) {
  return http.request({
    url: [Api.sentencePublish, id].join('/'),
    method: RequestEnum.GET,
    headers: {
      Authorization: token
    }
  })
}

/**
 * -信息发布修改
 * @param params
 */
export function putSentencePublish(params) {
  return http.request({
    url: Api.sentencePublish,
    method: RequestEnum.PUT,
    params,
    headers: {
      Authorization: token
    }
  })
}
