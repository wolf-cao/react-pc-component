import React from 'react'
import ReactDOM from 'react-dom'
import { Panel } from '../index'

const getContainer = id => {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', id)
  document.body.appendChild(wrapper)

  return wrapper
}

const removeContainer = id => {
  let confirmWrapper = document.getElementById(id)
  if (confirmWrapper) {
    ReactDOM.unmountComponentAtNode(confirmWrapper)
    confirmWrapper.parentNode.removeChild(confirmWrapper)
    confirmWrapper = null
  }
}

const ImagePreivew = {
  preview: imageUrl => {
    const randId = `J_imagePreview_${Math.floor(Math.random() * 10000000)}`
    ReactDOM.render(
      <Panel
        width="auto"
        title="图片预览"
        visible={true}
        onClose={() => {
          removeContainer(randId)
        }}
      >
        <img src={imageUrl} height="60%" />
      </Panel>,
      getContainer(randId)
    )
  }
}

export default ImagePreivew
