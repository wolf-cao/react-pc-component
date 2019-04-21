import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

class Checkbox extends Component {
  handleChange = evt => {
    evt.stopPropagation()
    this.props.onChange(!this.props.checked)
  }

  render() {
    const { label, checked, ...restProps } = this.props
    const checkboxCls = Classnames('pft-checkbox', {
      [`pft-checkbox-checked`]: checked
    })
    return (
      <div className={checkboxCls} onClick={this.handleChange}>
        <span className="pft-checkbox-box" />
        <label className="pft-checkbox-label">{label}</label>
        <input
          {...restProps}
          type="checkbox"
          className="pft-checkbox-element"
          checked={checked}
        />
      </div>
    )
  }
}

Checkbox.defaultProps = {
  checked: false
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

export default Checkbox
