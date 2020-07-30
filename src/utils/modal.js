/**
 * 主要用于集中性管理各种提示信息
 */
import {
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const duration = 1500
const center = true
const confirmMessage = '此操作不可逆，是否确认删除'

// 成功
export const success = (that, message) => {
  that.$message({
    type: 'success',
    center,
    message,
    duration
  })
}

// 失败
export const danger = (that, message) => {
  that.$message({
    type: 'error',
    center,
    message,
    duration
  })
}

// 警告
export const warning = (that, message) => {
  that.$message({
    type: 'warning',
    center,
    message,
    duration
  })
}

// 取消
export const info = (that, message) => {
  that.$message({
    type: 'info',
    center,
    message,
    duration
  })
}

// 异常(catch)专用

export const unusual = that => {
  that.$message({
    type: 'danger',
    center,
    messgae: '与服务器连接失败，请刷新或重新登录',
    duration
  })
}

export const confirm = (that, params = {}) => {
  return new Promise((resolve) => {
    that.$confirm(params.warning ? params.warning : confirmMessage, '警告', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      // obj 可支持所有js基本数据类型以及引用数据类型
      params.api(params.obj).then(res => {
        console.log(res)
        Message({
          type: 'success',
          message: '操作成功' || res,
          duration,
          center
        })
        resolve(true)
      })
    }).catch(err => {
      console.log(err)
      Message({
        type: 'info',
        message: '操作已取消',
        duration,
        center
      })
    })
  })
}
