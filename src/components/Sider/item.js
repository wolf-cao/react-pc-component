import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Icon } from '../index'

class SiderItem extends Component {
  render() {
    const { children, title, icon, href } = this.props

    const itemClass = Classnames('pft-sider-item', {
      [`pft-sider-item-selected`]: location.href.indexOf(href) > -1
    })

    return (
      <li className={itemClass}>
        {children ? (
          children
        ) : (
          <Link to={href}>
            <span className="pft-sider-item-link">
              {icon && <Icon name={icon} className="pft-sider-item-icon" />}
              {title}
            </span>
          </Link>
        )}
      </li>
    )
  }
}

SiderItem.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string
}

export default SiderItem
