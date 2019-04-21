import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '../index'

function noop() {}

class Button extends Component {
  render() {
    const {
      children,
      type,
      size,
      className,
      icon,
      onClick,
      disabled,
      block,
      ghost,
      mode,
      inline,
      iconColor,
      style
    } = this.props

    const buttonClass = classNames(
      'pft-button',
      `pft-button-${type}`,
      `pft-button-${size}`,
      {
        [`is-disabled`]: disabled,
        [`is-block`]: block,
        [`is-text-button`]: mode === 'text',
        [`is-ghost`]: ghost || type === 'white',
        [`is-inline`]: inline
      },
      `${className}`
    )

    return (
      <button
        className={buttonClass}
        onClick={disabled ? noop : onClick}
        style={style}
      >
        {icon ? <Icon name={icon} color={iconColor} /> : null}
        <span>{children}</span>
      </button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  ghost: PropTypes.bool,
  inline: PropTypes.bool,
  mode: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  className: '',
  mode: '',
  type: 'normal',
  size: 'large',
  disabled: false,
  block: false,
  ghost: false,
  inline: false,
  onClick: noop
}

export default Button
