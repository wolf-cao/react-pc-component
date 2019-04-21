import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from '../index'

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.container = null
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.visible) {
      this.removeContainer()
    }
    return true
  }

  removeContainer() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container)
      this.container.parentNode.removeChild(this.container)
      this.container = null
    }
  }

  getContainer = () => {
    if (!this.container) {
      const container = document.createElement('div')
      const containerId = `J_pftDialogContainer-${new Date().getTime()}`
      container.setAttribute('id', containerId)
      document.body.appendChild(container)
      this.container = container
    }
    return this.container
  }

  getComponent = () => {
    const { children, ...restProps } = this.props
    return (
      <Panel {...restProps} onClose={this.hideDialog}>
        {children}
      </Panel>
    )
  }

  hideDialog = () => {
    this.props.onClose()
    this.removeContainer()
  }

  render() {
    const { visible } = this.props
    return (
      <React.Fragment>
        {visible &&
          ReactDOM.createPortal(this.getComponent(), this.getContainer())}
      </React.Fragment>
    )
  }
}

export default Dialog
