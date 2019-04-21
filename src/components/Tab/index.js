import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './item'

function noop() {}

class Tab extends Component {
  static Item = Item

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.defaultKey
    }
  }

  handleTabChange = key => {
    this.setState(
      {
        activeKey: key
      },
      () => {
        this.props.onTabChange(key)
      }
    )
  }

  render() {
    const { children } = this.props
    const { activeKey } = this.state

    return (
      <div className="pft-tab">
        <div className="pft-tab-header">
          {(Array.isArray(children) ? children : [children]).map(
            (item, index) => (
              <div
                className={`pft-tab-title ${
                  activeKey === index ? 'pft-tab-title-active' : ''
                }`}
                onClick={() => {
                  this.handleTabChange(index)
                }}
              >
                {item.props.title}
              </div>
            )
          )}
        </div>
        <div className="pft-tab-content">
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              actived: activeKey === index
            })
          })}
        </div>
      </div>
    )
  }
}

Tab.propTypes = {
  defaultKey: PropTypes.number,
  onTabChange: PropTypes.func
}

Tab.defaultProps = {
  defaultKey: 0,
  onTabChange: noop
}

export default Tab
