import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Storage } from '@/utils/Storage'
const token = Storage.get(ACCESS_TOKEN)

enum Api {
  sentenceLatestRelease = '/sentence/latestRelease'
}
/**
 * @description: 语法分析
 * {
	"sentence": "需要解析的语句	",
	"step": "上一步或下一步(+、-)	",
	"token": "token"
}
 */
export function postAnalysis(params) {
  return http.request({
    url: `/analysis`,
    method: RequestEnum.POST,
    params
  })
}
/**
 * @description:  信息发布查询 所有
 */
export function getSentenceLatestRelease() {
  return http.request({
    url: [Api.sentenceLatestRelease, 'category'].join('/'),

    method: RequestEnum.GET
  })
}

/**
 * @description:  二级版块 所有
 */
export function getSentenceLatestReleaseById(id) {
  return http.request({
    url: [Api.sentenceLatestRelease, id].join('/'),
    method: RequestEnum.GET
  })
}
