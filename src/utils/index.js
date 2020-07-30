/*
* @description 创建随机数
* @methodName createRandomKey
* @author zero_fsc
* @date 2020-07-30 22:08:58
*/
export function createRandomKey () {
  return (Math.random() * 10).toString().substr(2, 5) + '-' + Math.random().toString().substr(2, 5) + '-' + (new Date()).getTime()
}
