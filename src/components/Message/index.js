import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Classnames from 'classnames'
import { Icon } from '../index'
import { addClass } from '../utils/index'

function noop() {}

const getContainer = id => {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', id)
  document.body.appendChild(wrapper)

  return wrapper
}

const renderElement = (msg, onClose, duration, type) => {
  const randId = `message_${Math.floor(Math.random() * 10000000)}`
  ReactDOM.render(
    <Message
      msg={msg}
      onClose={onClose}
      duration={duration}
      type={type}
      name={randId}
    />,
    getContainer(randId)
  )
}

class Message extends Component {
  componentDidMount() {
    const messageRef = ReactDOM.findDOMNode(this)
    const width = messageRef.offsetWidth
    const height = messageRef.offsetHeight
    messageRef.style.marginLeft = `${(-1 * width) / 2}px`
    messageRef.style.top = `${-1 * height - 10}px`
    setTimeout(() => {
      addClass(messageRef, 'is-animate')
      messageRef.style.top = '10px'
    }, 100)

    setTimeout(() => {
      this.props.onClose()
      ReactDOM.unmountComponentAtNode(document.getElementById(this.props.name))
      document
        .getElementById(this.props.name)
        .parentNode.removeChild(document.getElementById(this.props.name))
    }, this.props.duration + 100)
  }

  render() {
    const { msg, type } = this.props
    const messageClass = Classnames('pft-message', {
      [`pft-message-info`]: type === 'info',
      [`pft-message-success`]: type === 'success',
      [`pft-message-fail`]: type === 'fail'
    })

    let iconType = 'tishi'
    switch (type) {
      case 'success': {
        iconType = 'chenggong'
        break
      }
      case 'fail': {
        iconType = 'shibai'
        break
      }
      default: {
        iconType = 'tishi'
        break
      }
    }

    return (
      <div className={messageClass}>
        <Icon name={iconType} />
        {msg}
      </div>
    )
  }
}

const message = {
  info: (msg = '', onClose = noop, duration = 3000) => {
    renderElement(msg, onClose, duration, 'info')
  },
  success: (msg = '', onClose = noop, duration = 3000) => {
    renderElement(msg, onClose, duration, 'success')
  },
  fail: (msg = '', onClose = noop, duration = 3000) => {
    renderElement(msg, onClose, duration, 'fail')
  }
}

export default message
