/*
* @description HTTP封装
* @fileName http.js
* @author zero_fsc
* @date 2020-07-30 21:48:30
*/
import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import { createRandomKey } from './index'

const server = axios.create({
  timeout: 9 * 1000
})

/* 响应拦截器 */
server.interceptors.request.use(
  config => {
    const token = ''
    if (token) {
      token && (config.headers.token = token)
    }
    return config
  }, error => Promise.error(error)
)

/**
 * 请求拦截器
 * @code 200 | 请求成功
 * @code 400 | 参数错误
 * @code 401 | 身份不对
 * @code 403 | 没有权限
 * @code 406 | 参数问题
 * @code 409 | 数据已存在问题
 * @code 500 | 服务器想要失败 后端问题
 */
server.interceptors.response.use(
  res => {
    if (res.status === 200) {
      switch (res.data.status) {
        case 200: {
          return res.data
        }
        case 400: {
          Message({
            type: 'error',
            message: '参数错误',
            duration: 1500,
            center: true
          })
          break
        }
        case 401: {
          const msg = '您的令牌已失效，请重新登陆'
          MessageBox.confirm(msg, '提示', {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            try {
              window.location.href = '/'
            } catch (err) {
              console.log(err)
            }
          })
          return Promise.reject(res.data.error)
        }
        case 403: {
          Message({
            type: 'error',
            message: res.data.msg,
            duration: 1500,
            center: true
          })
          break
        }
        case 406: {
          Message({
            type: 'error',
            message: res.data.msg,
            duration: 1500,
            center: true
          })
          break
        }
        case 409: {
          Message({
            type: 'error',
            message: res.data.msg,
            duration: 1500,
            center: true
          })
          break
        }
        case 500: {
          Message({
            type: 'error',
            message: '服务器响应失败，请刷新重试',
            duration: 1500,
            center: true
          })
          break
        }
        default: {
          return res.data
        }
      }
    }
    return Promise.reject(res)
  }
)

/* http请求方法封装 */
export function httpServer (_param) {
  const {
    url,
    data,
    headers,
    method,
    responseType
  } = _param
  const _method = method.toLowerCase()
  if (!url) {
    return new Promise((resolve, reject) => reject(new Error('url为空')))
  }

  if (_method === 'get' || _method === 'delete') {
    return new Promise((resolve, reject) => {
      server({
        url,
        method,
        headers,
        params: {
          ...data,
          random: createRandomKey()
        }
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  } else if (_method === 'post' || _method === 'put' || _method === 'blob') {
    return new Promise((resolve, reject) => {
      server({
        url,
        method,
        responseType,
        headers: headers || {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  } else if (_method === 'upload') {
    const formData = new FormData()
    formData.append(data)
    return new Promise((resolve, reject) => {
      server({
        url,
        method,
        headers: headers || {
          'Content-Type': 'application/form-data;charset="UTF-8'
        },
        data: formData
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  } else {
    Message({
      type: 'warning',
      message: '暂无该类型请求方法，请创建',
      duration: 2000,
      center: true
    })
  }
}
