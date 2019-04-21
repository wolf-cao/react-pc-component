import React, { Component } from 'react'
import PropTypes from 'prop-types'

function noop() {}

export default class IconFont extends Component {
  render() {
    const { className, name, color, onClick } = this.props
    return (
      <i
        className={`iconfont icon-${name} ${className}`}
        style={{ color }}
        onClick={onClick}
      />
    )
  }
}

IconFont.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

IconFont.defaultProps = {
  name: '',
  className: '',
  color: '',
  onClick: noop
}
