import React, { Component } from 'react'
import Classnames from 'classnames'

class DropdownItem extends Component {
  render() {
    const { handleDropdownEvent, activeValue, value, text } = this.props
    const optionClass = Classnames('pft-dropdown-item', {
      [`pft-dropdown-item-selected`]: activeValue === value
    })
    return (
      <div
        className={optionClass}
        onClick={evt => {
          handleDropdownEvent(evt, {
            text,
            val: value
          })
        }}
      >
        {text}
      </div>
    )
  }
}

export default DropdownItem
