import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

class Menus extends Component {
  getNodes(data, isChildGroup = false) {
    const groupClass = Classnames('pft-menus-group', {
      [`pft-menus-is-child`]: isChildGroup
    })
    return (
      <ul className={groupClass}>
        {data.map(item => {
          return (
            <li className="pft-menu-item">
              <a href={item.url} className="pft-menu-item-text">
                {item.text}
              </a>
              {item.children && this.getNodes(item.children, true)}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const { data } = this.props
    return <div className="pft-menus">{this.getNodes(data)}</div>
  }
}

Menus.propTypes = {
  data: PropTypes.array
}

export default Menus
