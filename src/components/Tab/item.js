import React, { Component } from 'react'
import Classnames from 'classnames'

class TabItem extends Component {
  render() {
    const { children, actived } = this.props
    const itemListClass = Classnames('pft-tab-item-list', {
      [`pft-tab-item-list-active`]: actived
    })

    return <div className={itemListClass}>{children}</div>
  }
}

export default TabItem
