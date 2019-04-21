import React, { Component } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

export default class Badge extends Component {
  componentDidMount() {
    const { offset } = this.props
    if (document.querySelector('.pf-badge-position')) {
      if (offset) {
        document.querySelector('.pf-badge-position').style.top = offset[0]
        document.querySelector('.pf-badge-position').style.right = offset[1]
      }
    }
  }

  render() {
    const { preClass, type, size, value, offset, children } = this.props
    const badgeClassName = ClassNames(
      preClass,
      {
        [`${preClass}-${type}`]: type,
        [`${preClass}-${size}`]: size
      },
      {
        [`${preClass}-position`]: children
      }
    )
    return (
      <div className="pf-badge-wrap">
        {children && <div className="pf-badge-children">{children}</div>}
        <span className={badgeClassName}>{value}</span>
      </div>
    )
  }
}

Badge.propTypes = {
  preClass: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  offset: PropTypes.Array
}

Badge.defaultProps = {
  preClass: 'pf-badge',
  type: 'primary',
  size: 'normal',
  // 可以进行偏移
  offset: []
}
