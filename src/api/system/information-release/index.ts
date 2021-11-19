import http from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

enum Api {
  adminAccount = '/sentence/publish/list'
}

/**
 * 获取信息发布表
 * @param params
 */
export function getPublishList() {
  return http.request(
    {
      url: Api.adminAccount,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * 删除账号
 * @param params
 */
export function delAdminAccount(id: string) {
  return http.request(
    {
      url: [Api.adminAccount, id].join('/'),
      method: RequestEnum.DELETE
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '删除成功'
    }
  )
}

/**
 * 修改账号
 * @param params
 */
export function patchAdminAccount(id, params) {
  return http.request(
    {
      url: [Api.adminAccount, id].join('/'),
      method: RequestEnum.PATCH,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '修改成功'
    }
  )
}

/**
 * 新建账号
 * @param params
 */
export function postAdminAccount(params) {
  return http.request(
    {
      url: Api.adminAccount,
      method: RequestEnum.POST,
      params
    },
    {
      isShowErrorMessage: true, // 是否显示错误提示信息
      successMessageText: '新建成功'
    }
  )
}
