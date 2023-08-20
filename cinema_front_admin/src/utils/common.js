/**
 * 防抖函数
 * @param {*} fn 方法
 * @param {*} delay 延时执行时间
 * @param {*} immdiate 是否初始化执行
 * @returns 
 */
export function debounce(fn, delay = 500, immdiate = false) {
    let timer = null
    let isInvoke = false
    function _debounce(...arg) {
      if (timer) clearTimeout(timer)
      if (immdiate && !isInvoke) {
        fn.apply(this, arg)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          fn.apply(this, arg)
          isInvoke = false
          timer = null
        }, delay)
      }
    }
  
    // 取消功能
    _debounce.cancel = function () {
      if (timer) clearTimeout(timer)
      timer = null
      isInvoke = false
  
    }
    return _debounce
  }