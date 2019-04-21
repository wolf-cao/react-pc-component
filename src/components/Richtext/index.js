import React, { Component } from 'react'
import RichTextEditor from 'react-rte'
import PropTypes from 'prop-types'
import { Icon } from '../index'

class Richtext extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
        ? RichTextEditor.createValueFromString(props.value, 'html')
        : RichTextEditor.createEmptyValue()
    }
  }

  onChange = value => {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value.toString('html'))
    }
  }

  render() {
    const { richPreCls, error, ...restProps } = this.props
    const { value } = this.state

    return (
      <div className={richPreCls}>
        <RichTextEditor value={value} onChange={this.onChange} />
        <textarea
          {...restProps}
          value={value.toString('html')}
          className="fn-hide"
        />
        {error && (
          <div className={`${richPreCls}-error`}>
            <Icon name="shibai" className={`${richPreCls}-error-icon`} />
            {error}
          </div>
        )}
      </div>
    )
  }
}

Richtext.propTypes = {
  onChange: PropTypes.func
}

Richtext.defaultProps = {
  richPreCls: 'pft-richtext'
}

export default Richtext
