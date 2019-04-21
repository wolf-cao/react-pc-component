import React from 'react'
import ReactDOM from 'react-dom'
import FilterPlane from './filterPlane'

const sortTable = (source, data, key, reverce) => {
  let revert = 0
  if (reverce === 'up') {
    revert = 1
  }
  if (reverce === 'down') {
    revert = -1
  }

  if (!revert) {
    return source
  }

  return data.sort((a, b) => {
    return (a[key] - b[key]) * revert
  })
}

const renderFilter = (...restProps) => {
  renderElement(...restProps)
}

const renderElement = (...restProps) => {
  const randId = `filterdrop_${Math.floor(Math.random() * 10000000)}`
  ReactDOM.render(
    <FilterPlane
      name={randId}
      element={restProps[0]}
      defalutValues={restProps[1]}
      propKey={restProps[2]}
      filters={restProps[3]}
      onHide={restProps[4]}
      onConfirm={restProps[5]}
    />,
    getContainer(randId)
  )
}

const getContainer = id => {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', id)
  document.body.appendChild(wrapper)
  return wrapper
}

export { sortTable, renderFilter }
