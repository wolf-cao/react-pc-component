import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createForm } from 'rc-form'
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  DatePicker,
  Richtext,
  Radio,
  AutoComplete
} from '../index'
import 'rc-calendar/assets/index.css'
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group

function noop() {}

class Searchbox extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.formData)
  }

  handleChange = (value, name) => {
    const tmpFormValue = this.props.formData
    tmpFormValue[name] = value || ''
    this.props.form.setFieldsValue(tmpFormValue)
  }

  handleAutoChange = (value, name, item) => {
    this.handleChange(value, name)

    if (item.onChange) {
      item.onChange(value)
    }
  }

  handleSubmit = () => {
    const { onError, onSubmit } = this.props
    this.props.form.validateFields((error, formValue) => {
      if (error) {
        onError(error)
        return
      }
      onSubmit(formValue)
    })
  }

  renderSearchElement() {
    const { config, formData, autoDataSource } = this.props
    const { getFieldProps, getFieldError } = this.props.form
    let elementArr = []

    config.map(item => {
      switch (item.type) {
        case 'hidden': {
          elementArr.push(
            <input
              type="hidden"
              {...getFieldProps(item.name, {
                initialValue: item.defaultValue
              })}
            />
          )
          break
        }
        case 'text': {
          elementArr.push(
            <Form.Item label={item.label}>{item.value}</Form.Item>
          )
          break
        }
        case 'autoComplete': {
          elementArr.push(
            <Form.Item label={item.label} required={item.required}>
              <AutoComplete
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue || ''
                })}
                dataSource={autoDataSource}
                error={getFieldError(item.name)}
                placeholder={item.placeholder || ''}
                onChange={evt => {
                  this.handleAutoChange(evt.target.value, item.name, item)
                }}
                onAutoSelect={value => {
                  this.handleChange(value, item.name)
                }}
              />
            </Form.Item>
          )
          break
        }
        case 'textarea': {
          elementArr.push(
            <Form.Item
              label={item.label}
              explain={item.explain}
              required={item.required}
            >
              <Input
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue || ''
                })}
                mode="textarea"
                error={getFieldError(item.name)}
                placeholder={item.placeholder || ''}
              />
            </Form.Item>
          )
          break
        }
        case 'select': {
          if (!item.mode) {
            elementArr.push(
              <Form.Item
                label={item.label}
                explain={item.explain}
                required={item.required}
              >
                <Select
                  {...getFieldProps(item.name, {
                    rules: item.rules || [],
                    initialValue: item.defaultValue || ''
                  })}
                  width={item.width}
                  defaultValue={item.defaultValue}
                  error={getFieldError(item.name)}
                  onChange={value => {
                    this.handleChange(value, item.name)
                  }}
                >
                  {item.value.map(ele => (
                    <Select.Option value={ele.value} text={ele.text} />
                  ))}
                </Select>
              </Form.Item>
            )
          } else {
            elementArr.push(
              <Form.Item
                label={item.label}
                explain={item.explain}
                required={item.required}
              >
                <Select
                  {...getFieldProps(item.name, {
                    rules: item.rules || [],
                    initialValue: item.defaultValue || ''
                  })}
                  width={item.width}
                  defaultValue={item.defaultValue}
                  error={getFieldError(item.name)}
                  onChange={value => {
                    this.handleChange(value, item.name)
                  }}
                  mode={item.mode}
                  {...item}
                />
              </Form.Item>
            )
          }
          break
        }
        case 'checkbox': {
          elementArr.push(
            <Form.Item
              label={item.label}
              required={item.required}
              explain={item.explain}
            >
              <Checkbox
                {...getFieldProps(item.name, {
                  valuePropName: 'checked',
                  rules: item.rules || [],
                  initialValue: item.defaultValue
                })}
                label={item.checkLabel}
                checked={formData[item.name]}
                onChange={value => {
                  this.handleChange(value, item.name)
                }}
              />
            </Form.Item>
          )
          break
        }
        case 'radio': {
          elementArr.push(
            <Form.Item
              label={item.label}
              required={item.required}
              explain={item.explain}
            >
              <RadioGroup
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue
                })}
                defaultValue={item.defaultValue}
                onChange={value => {
                  this.handleChange(value, item.name)
                }}
              >
                {item.value.map(ele => (
                  <Radio value={ele.value}>{ele.text}</Radio>
                ))}
              </RadioGroup>
            </Form.Item>
          )
          break
        }
        case 'rangepicker': {
          elementArr.push(
            <Form.Item
              label={item.label}
              required={item.required}
              explain={item.explain}
            >
              <RangePicker
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue
                })}
                format={item.format}
                showTime={item.showTime}
                placeholder={item.placeholder}
                value={item.value}
                defaultValue={item.defaultValue}
                width={item.width}
                onChange={value => {
                  this.handleChange(value, item.name)
                }}
                {...item}
              />
            </Form.Item>
          )
          break
        }
        case 'richtext': {
          elementArr.push(
            <Form.Item
              label={item.label}
              required={item.required}
              explain={item.explain}
            >
              <Richtext
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue || ''
                })}
                error={getFieldError(item.name)}
                width={item.width}
              />
            </Form.Item>
          )
          break
        }

        default: {
          elementArr.push(
            <Form.Item
              label={item.label}
              explain={item.explain}
              required={item.required}
            >
              <Input
                {...getFieldProps(item.name, {
                  rules: item.rules || [],
                  initialValue: item.defaultValue || ''
                })}
                placeholder={item.placeholder || ''}
                error={getFieldError(item.name)}
              />
            </Form.Item>
          )
        }
      }
    })

    return elementArr
  }

  render() {
    const { layout, submitText, buttonWidth } = this.props

    return (
      <div className="pft-searchbox">
        <Form layout={layout}>
          {this.renderSearchElement()}
          <Form.Item>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              style={{ width: `${buttonWidth}px` }}
            >
              {submitText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

Searchbox.propTypes = {
  layout: PropTypes.string,
  config: PropTypes.array,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  onError: PropTypes.func
}

Searchbox.defaultProps = {
  layout: 'inline',
  submitText: '查询',
  onSubmit: noop,
  onError: noop
}

export default createForm()(Searchbox)
