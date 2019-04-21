import React, { Component } from 'react'
import { createForm } from 'rc-form'
import debounce from 'lodash.debounce'
import Ajax from 'axios'
import {
  Form,
  Input,
  Select,
  Button,
  Radio,
  AutoComplete
} from '../../components/index'
import MainContent from '../index'
const RadioGroup = Radio.Group

class FormDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoData: [],
      autoName: '',
      flag: false
    }
    this.searchData = debounce(this.handleSearch, 500)
  }

  handleChangeEvent = evt => {
    this.searchData(evt.target.value)
  }

  handleSearch(value) {
    Ajax({
      url: 'xxxxxxxx',
      method: 'post',
      data: {
        OrgName: value,
        OrgType: 1
      }
    })
      .then(res => (res = res.data))
      .then(res => {
        this.setState({
          autoData: res.Result.Data.map(item => {
            return { text: item.OrgName, value: item.OrgCode }
            // return item.OrgName
          })
        })
      })
  }

  handleSubmit = () => {
    this.props.form.validateFields((error, formValue) => {
      if (error) {
        console.log(error, 'error')
        return
      }
      console.log(formValue, 'formValue')
    })
  }

  render() {
    const { autoData, flag } = this.state
    const { getFieldProps, getFieldError } = this.props.form
    const companyError = getFieldError('companyId')
    const prograssError = getFieldError('prograss')
    const commentError = getFieldError('comment')

    return (
      <MainContent>
        <h1 className="api-title">>> Form</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Form labelWidth="84">
          <Form.Item label="所属分公司" required>
            <AutoComplete
              {...getFieldProps('company', {
                rules: [{ required: true, message: '所属分公司不能为空' }],
                onChange: this.handleChangeEvent
              })}
              dataSource={autoData}
              onAutoSelect={item => {
                this.props.form.setFieldsValue({
                  company: item.text,
                  // company: item
                  companyId: item.value
                })
              }}
              placeholder="请输入..."
              error={companyError}
            />
            <input
              {...getFieldProps('companyId', {
                rules: [
                  {
                    required: true,
                    message: '所属分公司不能为空'
                  }
                ]
              })}
              type="hidden"
            />
          </Form.Item>

          <Form.Item label="业务对接人员">貂蝉</Form.Item>

          {flag && (
            <Form.Item label="开发进度" required>
              <Select
                {...getFieldProps('prograss', {
                  rules: [{ required: true, message: '请选择开发进度' }]
                })}
                error={prograssError}
              >
                <Select.Option value="car" text="汽车" />
                <Select.Option value="ship" text="轮船" />
                <Select.Option value="plane" text="飞机" />
              </Select>
            </Form.Item>
          )}

          <Form.Item label="开始时间">2019/02/24</Form.Item>

          <Form.Item label="结束时间">2019/03/24</Form.Item>

          <Form.Item label="审核">
            <RadioGroup {...getFieldProps('radiovalue', {})} initialValue={2}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </RadioGroup>
          </Form.Item>

          <Form.Item label="备注" required>
            <Input
              {...getFieldProps('comment', {
                rules: [{ required: true, message: '备注不能为空' }]
              })}
              mode="textarea"
              placeholder="请输入..."
              error={commentError}
            />
          </Form.Item>

          <Form.Item>
            注: 带 <span style={{ color: '#dc7f58' }}>*</span> 的为必填项
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" onClick={this.handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </MainContent>
    )
  }
}

export default createForm()(FormDemo)
