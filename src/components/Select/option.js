import React, { Component } from 'react'
import Classnames from 'classnames'

class SelectOption extends Component {
  render() {
    const { handleSelectEvent, activeValue, value, text } = this.props
    const optionClass = Classnames('pft-select-option', {
      [`pft-select-option-selected`]: activeValue === value
    })
    return (
      <li
        className={optionClass}
        onClick={() => {
          handleSelectEvent(value)
        }}
      >
        {text}
      </li>
    )
  }
}

export default SelectOption
