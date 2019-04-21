import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class FormItem extends Component {
  render() {
    const {
      preCls,
      label,
      labelWidth,
      required,
      explain,
      children
    } = this.props
    const formItemClassName = classNames('pft-form-item', preCls)

    return (
      <div className={formItemClassName}>
        <div
          className="pft-form-item-label"
          style={{ width: `${labelWidth}px` }}
        >
          {required && <span className="pft-form-item-is-required">*</span>}
          {label}
        </div>
        <div className="pft-form-item-input">
          {!!children.props
            ? React.cloneElement(children, {
                explain
              })
            : children}
        </div>
      </div>
    )
  }
}

FormItem.propTypes = {
  preCls: PropTypes.string,
  explain: PropTypes.any
}

FormItem.defaultProps = {
  preCls: '',
  explain: '',
  label: '',
  layout: 'horizontal'
}

export default FormItem
