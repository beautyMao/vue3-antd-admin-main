import http from '@/utils/http/axios'
import { BasicResponseModel } from '@/api/BasicResponseModel'
import { LoginParams, LoginResultModel } from './model/userModel'
import { ContentTypeEnum } from '@/enums/httpEnum'

enum Api {
  login = '/admin/login',
  logout = '/login/logout'
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request(
    {
      url: Api.login,
      method: 'POST'
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户登录
 */
export function login(params: LoginParams) {
  return http.request<BasicResponseModel<LoginResultModel>>(
    {
      url: Api.login,
      method: 'POST',
      headers: {
        'Content-Type': ContentTypeEnum.JSON
      },
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params
    },
    {
      isTransformRequestResult: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: Api.logout,
    method: 'POST',
    params
  })
}

/**
 * @description: 获取token
 */
export function getTokenByHome() {
  return http.request({
    url: '/token',
    method: 'get'
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

/**
 * @description: 获取验证码图片
 */
export function getCaptchaImage() {
  return http.request({
    url: '/captchaImage',
    method: 'get'
  })
}

/**
 * @description: 用户登录
 */
export function loginNew(params) {
  return http.request({
    url: '/login',
    method: 'POST',
    params
  })
}

/**
 * @description: 注册获取手机验证码URL
 */
export function getRegister(phonenumber) {
  return http.request({
    url: `/checkSms/register/${phonenumber}`,
    method: 'GET'
  })
}

/**
 * @description: 注册接口文档
 */
export function postUserRegister(params) {
  return http.request({
    url: '/system/user/regist',
    method: 'POST',
    params
  })
}
