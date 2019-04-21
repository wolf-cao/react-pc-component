import React, { Component } from 'react'
import Classnames from 'classnames'
import { hasClass, removeClass, addClass } from '../utils/index'
import { Icon } from '../index'

class SiderGroup extends Component {
  handleGroupClick = evt => {
    let target = evt.target
    if (!hasClass(target, 'pft-sider-item-title')) {
      target = target.parentNode
    }

    if (hasClass(target, 'pft-sider-group-selected')) {
      removeClass(target, 'pft-sider-group-selected')
    } else {
      addClass(target, 'pft-sider-group-selected')
    }
  }

  render() {
    const { title, children, icon, activeKey } = this.props

    const groupTitleClass = Classnames(
      'pft-sider-item-link',
      'pft-sider-item-title',
      {
        [`pft-sider-group-selected`]:
          children.filter(item => location.href.indexOf(item.props.href) > -1)
            .length > 0
      }
    )

    return (
      <li className="pft-sider-item">
        <div className={groupTitleClass} onClick={this.handleGroupClick}>
          {icon && <Icon name={icon} className="pft-sider-item-icon" />}
          {title}
          <Icon name="xiangxiafanye" className="pft-sider-group-arrow" />
        </div>
        <ul className="pft-sider-group">
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              activeKey
            })
          })}
        </ul>
      </li>
    )
  }
}

export default SiderGroup
