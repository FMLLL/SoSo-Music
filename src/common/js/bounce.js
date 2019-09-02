export const bounce = function (fn, delay) {

  let timer = null
  return function (...arg) {
  	timer && clearTimeout(timer)
  	timer = setTimeout(() => {
  	  fn.apply(this, arg)
  	  console.log(arg)
  	}, delay)
  }
}