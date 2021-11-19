import http from '@/utils/http/axios'

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
    method: 'POST',
    params
  })
}
