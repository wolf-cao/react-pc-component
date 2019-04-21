import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class WhiteSpace extends Component {
  render() {
    const { size } = this.props
    const whitespaceClass = classNames(
      'pft-whitespace',
      `pft-whitespace-${size}`
    )
    return <div className={whitespaceClass} />
  }
}

WhiteSpace.propTypes = {
  size: PropTypes.string
}

WhiteSpace.defaultProps = {
  size: 'lg'
}

export default WhiteSpace
