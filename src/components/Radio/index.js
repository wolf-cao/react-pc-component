import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import RadioGroup from './group'

class Radio extends Component {
  static Group = RadioGroup

  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onchange = value => {
    if(this.props.disabled){return}

    
    if(this.props.onChange){
      this.props.onChange(value)
      return
    }
  }

  render() {
    const {
      children,
      value,
      checked,
      name,
      disabled,
      ...restProps
    } = this.props

    const { active } = this.state

    const radioWrapperClass = Classnames('pft-radio-wrapper', {
      [`pft-radio-wrapper-active`]: active || checked,
      [`pft-radio-wrapper-disabled`]: disabled
    })

    const radioClass = Classnames('pft-radio', {
      [`pft-radio-active`]: active || checked
    })

    return (
      <div className={radioWrapperClass}>
        <span className="pft-radio">
          <input type="radio" onChange={() => {this.onchange(value)}} className="pft-radio-input" value={value} checked={checked} name={name} />
          <span className="pft-radio-inner"></span>
        </span>
        <span className="pft-radio-text" onClick={() => {this.onchange(value)}}>{children}</span>
      </div>
    )
  }
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool
}

Radio.defaultProps = {
  checked: true,
  disabled: false
}

export default Radio
