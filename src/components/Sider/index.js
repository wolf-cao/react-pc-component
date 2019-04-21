import React, { Component } from 'react'
import Group from './group'
import Item from './item'

class Sider extends Component {
  static Group = Group
  static Item = Item

  render() {
    const { children, activeKey, width } = this.props
    return (
      <ul className="pft-sider" style={{ width: `${width}px` }}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            activeKey
          })
        })}
      </ul>
    )
  }
}

Sider.defaultProps = {
  width: '230'
}

export default Sider
