import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TitleBar extends Component {
  render() {
    const { title, extra } = this.props
    return (
      <div className="pft-titlebar">
        <div className="pft-titlebar-title">{title}</div>
        <div className="pft-titlebar-extra">{extra}</div>
      </div>
    )
  }
}

TitleBar.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string, PropTypes.element),
  extra: PropTypes.element
}

export default TitleBar
