import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Icon } from '../index'

function normalizeValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return ''
  }
  return value + ''
}

export default class Input extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    const value =
      typeof props.value === 'undefined' ? props.defaultValue : props.value
    this.state = {
      value
    }
  }

  setValue(value, e, callback) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback)
    }
    const { onChange } = this.props
    if (onChange) {
      let event = e
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e)
        event.target = this.input
        event.currentTarget = this.input
        const originalInputValue = this.input.value
        // change input value cause e.target.value should be '' when clear input
        this.input.value = ''
        onChange(event)
        // reset input value
        this.input.value = originalInputValue
        return
      }
      onChange(event)
    }
  }

  focus() {
    this.input.focus()
  }

  handleClear = e => {
    this.setValue('', e, () => {
      this.focus()
    })
  }

  handleInputChange = e => {
    this.setValue(e.target.value, e)
  }

  handleInputBlur = evt => {
    const { value } = evt.target
    const { onBlur } = this.props

    if (onBlur) {
      setTimeout(() => onBlur(value))
    }
  }

  saveInput = node => {
    this.input = node
  }

  render() {
    const { value } = this.state
    const {
      inputPreCls,
      placeholder,
      maxLength,
      error,
      mode,
      width,
      ...restProps
    } = this.props

    const { name, explain } = restProps

    const inputElementClass = Classnames(inputPreCls, {
      [`pft-input-is-error`]: error
    })

    const explainElement = explain ? (
      <div className={`${inputPreCls}-explain`}>{explain}</div>
    ) : null

    const errorElement = error ? (
      <div className={`${inputPreCls}-error`}>
        <Icon name="shibai" className={`${inputPreCls}-error-icon`} />
        {error}
      </div>
    ) : null

    return (
      <div className={inputElementClass}>
        <div className={`${inputPreCls}-item`}>
          {mode === 'text' ? (
            <React.Fragment>
              <input
                {...restProps}
                style={{ width: `${width}` }}
                type="text"
                name={name}
                maxLength={maxLength}
                className={`${inputPreCls}-element`}
                placeholder={placeholder}
                value={value}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                ref={this.saveInput}
              />
              {value ? (
                <em
                  className={`${inputPreCls}-clear`}
                  onClick={this.handleClear}
                />
              ) : null}
            </React.Fragment>
          ) : (
            <textarea
              {...restProps}
              ref={this.saveInput}
              name={name}
              rows="4"
              maxLength={maxLength}
              className={`${inputPreCls}-element ${inputPreCls}-textarea-element`}
              placeholder={placeholder}
              value={value}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          )}
        </div>
        {errorElement || explainElement}
      </div>
    )
  }
}

Input.defaultProps = {
  inputPreCls: 'pft-input',
  mode: 'text',
  placeholder: '',
  error: ''
}

Input.propTypes = {
  error: PropTypes.string
}
