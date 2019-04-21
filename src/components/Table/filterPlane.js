import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createForm } from 'rc-form'
import { Button, Checkbox } from '../index'
import { closest } from '../utils/index'

class FilterPlane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: props.defalutValues
    }
  }

  componentDidMount() {
    const { element } = this.props
    const planeContent = ReactDOM.findDOMNode(this)
    const planeElement = document.getElementById(this.props.name)
    planeElement.style.position = 'absolute'
    planeElement.style.top = `${element.top + element.height}px`
    planeElement.style.left = `${element.left -
      (planeContent.offsetWidth - element.width)}px`
    this.initDocumentEvent()
  }

  initDocumentEvent() {
    document.addEventListener('click', this.handleDocument)
  }

  handleDocument = evt => {
    const planeBox = closest(evt.target, '.pft-table-planeBox')
    if (!planeBox) {
      this.removePlaneAndEvent()
    }
  }

  removePlaneAndEvent() {
    document.removeEventListener('click', this.handleDocument)
    ReactDOM.unmountComponentAtNode(document.getElementById(this.props.name))
    document
      .getElementById(this.props.name)
      .parentNode.removeChild(document.getElementById(this.props.name))
    this.props.onHide()
  }

  getFormData() {
    const outputData = {}
    outputData[this.props.propKey] = this.props.form.getFieldsValue()
    this.props.onConfirm(outputData)
    this.removePlaneAndEvent()
  }

  handleReset = () => {
    this.setState(
      {
        formData: {}
      },
      () => {
        this.props.form.resetFields()
        this.getFormData()
      }
    )
  }

  handleSubmit = () => {
    this.getFormData()
  }

  handleChange = (value, name) => {
    const tmpForm = this.state.formData
    tmpForm[name] = value
    this.setState(
      {
        formData: tmpForm
      },
      () => {
        this.props.form.setFieldsValue(tmpForm)
      }
    )
  }

  render() {
    const { formData } = this.state
    const { filters, propKey, defalutValues } = this.props
    const { getFieldProps } = this.props.form

    return (
      <div className="pft-table-planeBox">
        <ul>
          {filters.map((item, index) => (
            <li title={item.text} key={index}>
              <Checkbox
                {...getFieldProps(`${propKey}_${index}`)}
                label={item.text}
                checked={
                  defalutValues[`${propKey}_${index}`] ||
                  formData[`${propKey}_${index}`]
                }
                onChange={value => {
                  this.handleChange(value, `${propKey}_${index}`)
                }}
              />
            </li>
          ))}
        </ul>
        <div className="pft-table-plane-footer">
          <Button size="mini" onClick={this.handleReset}>
            重置
          </Button>
          <Button size="mini" type="primary" onClick={this.handleSubmit}>
            确定
          </Button>
        </div>
      </div>
    )
  }
}

export default createForm()(FilterPlane)
