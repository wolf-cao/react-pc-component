import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'

class Popover extends Component {
  render() {
    const { children, ...restProps } = this.props
    return (
      <Tooltip {...restProps}>
        <div>{children}</div>
      </Tooltip>
    )
  }
}

export default Popover
