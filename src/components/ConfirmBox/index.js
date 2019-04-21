import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Panel } from '../index'

// confirm组件
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

function noop() {
  //
}

export const ConfirmDialog = () => {
  return {
    init: (
      title = '提示',
      text,
      onConfirm = noop,
      onCancel = noop,
      onClose = noop
    ) => {
      const randId = `J_confirmbox_${Math.floor(Math.random() * 10000000)}`
      ReactDOM.render(
        <Panel
          title={title}
          width="370px"
          visible={true}
          hideClose={true}
          footer={
            <div className="pft-confirmbox-footer">
              <Button
                className="pft-confirmbox-footer-button"
                size="large"
                onClick={() => {
                  onCancel()
                  removeContainer(randId)
                }}
              >
                取消
              </Button>
              <Button
                className="pft-confirmbox-footer-button"
                type="primary"
                size="large"
                onClick={() => {
                  onConfirm()
                  removeContainer(randId)
                }}
              >
                确定
              </Button>
            </div>
          }
          onClose={() => {
            onClose()
            removeContainer(randId)
          }}
        >
          <div className="pft-confirmbox">{text}</div>
        </Panel>,
        getContainer(randId)
      )
    }
  }
}

const ConfirmBox = ConfirmDialog().init

export default ConfirmBox
