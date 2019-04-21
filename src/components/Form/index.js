import React, { Component } from 'react'
import Classnames from 'classnames'
import Item from './item'

class Form extends Component {
  static Item = Item

  render() {
    const { labelWidth, layout, children } = this.props
    const formClass = Classnames('pft-form', {
      [`pft-form-inline`]: layout === 'inline',
      [`pft-form-horizontal`]: layout === 'horizontal'
    })

    return (
      <div className={formClass}>
        {React.Children.map(children, child => {
          if (child) {
            return React.cloneElement(child, {
              labelWidth
            })
          }
        })}
      </div>
    )
  }
}

export default Form
