import React, { Component } from 'react'
import Classnames from 'classnames'
import { Icon } from '../index'

class Spin extends Component {
  render() {
    const { SpinPreCls, children, loading } = this.props

    if (children) {
      const spinContentClass = Classnames(`${SpinPreCls}-content`, {
        [`${SpinPreCls}-focus`]: loading
      })

      return (
        <div className={`${SpinPreCls} ${SpinPreCls}-net-wrapper`}>
          {loading && (
            <div className={`${SpinPreCls}-container`}>
              <Icon name="loading" className={`${SpinPreCls}-icon`} />
            </div>
          )}
          <div className={spinContentClass}>{children}</div>
        </div>
      )
    }

    return (
      <div className={SpinPreCls}>
        <div className={`${SpinPreCls}-icon-box`}>
          <Icon name="loading" className={`${SpinPreCls}-icon`} />
        </div>
        <div className={`${SpinPreCls}-mask`} />
      </div>
    )
  }
}

Spin.defaultProps = {
  SpinPreCls: 'pft-spin'
}

export default Spin
