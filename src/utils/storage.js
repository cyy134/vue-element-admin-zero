/*
* @description 封装缓存类
* @fileName storage.js
* @author zero_fsc
* @date 2020-07-30 21:59:03
*/

class Storage {
  /*
  * @description 存储缓存数据
  * @fileName storage.js
  * @author zero_fsc
  * @date 2020-07-30 22:01:14
  */
  setStorage (k, v) {
    if (Object.prototype.toString.call(v) === '[object Object]') {
      sessionStorage.setItem(k, JSON.stringify(v))
    }
    sessionStorage.setItem(k, v)
  }

  /*
  * @description 获取缓存数据
  * @fileName storage.js
  * @author zero_fsc
  * @date 2020-07-30 22:00:03
  */
  getStorage (k) {
    return sessionStorage.getItem(k)
  }

  /*
  * @description 删除缓存
  * @fileName storage.js
  * @author zero_fsc
  * @date 2020-07-30 22:02:45
  */
  removeStorage (k) {
    sessionStorage.removeItem(k)
  }
}

export default new Storage()
