import http from '@/utils/http/axios'
import { Storage } from '@/utils/Storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { RequestEnum } from '@/enums/httpEnum'
const token = Storage.get(ACCESS_TOKEN)
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
