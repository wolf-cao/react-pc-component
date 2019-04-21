export function addClass(el, className) {
  if (hasClass(el, className)) {
    return ''
  } else {
    // 没有该class则在该元素上新添加class名
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

/**
 * 验证是否有该class名
 * @param {*} el dom元素
 * @param {*} className class名
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '($|\\s)')
  return reg.test(el.className)
}

export function removeClass(el, className) {
  if (hasClass(el, className)) {
    el.className = el.className.replace(new RegExp(className), '')
  } else {
    return ''
  }
}

export function closest(el, selector) {
  var matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break
    }
    el = el.parentElement
  }
  return el
}

export function getKeysFromArray(datas, value, childrenKey, ValueKey, textKey) {
  const tmpArr = []
  const searchMethod = (sdatas, svalue) => {
    sdatas.map(data => {
      if (data[ValueKey] === svalue) {
        tmpArr.push(data[textKey])
        return
      }
      if (data[childrenKey]) {
        searchMethod(data[childrenKey], svalue, ValueKey, textKey)
      }
    })
  }

  if (typeof value === 'string') {
    value = [value]
  }

  value.map(item => searchMethod(datas, item))

  return tmpArr
}
