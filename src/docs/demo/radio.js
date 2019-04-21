import React, { Component } from 'react'
import { Radio } from '../../components/index'
import MainContent from '../index'

const RadioGroup = Radio.Group

export default class PopoverDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  onChange = value => {
    console.log(value)
    this.setState({
      value
    })
  }

  render() {
    return (
      <MainContent >
        <h1 className="api-title">>> 单选</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        
        <p>
          <Radio>Radio</Radio>
        </p>

        <RadioGroup defaultValue={2} onChange={this.onChange} >
          <Radio value={"A"}>Radio A</Radio>
          <Radio value={2}>Radio B</Radio>
          <Radio value={3}>Radio C</Radio>
          <Radio value={4}>Radio D</Radio>
        </RadioGroup>

        <RadioGroup defaultValue={2} onChange={this.onChange} disabled={true}>
          <Radio value={"A"}>Radio A</Radio>
          <Radio value={2}>Radio B</Radio>
          <Radio value={3}>Radio C</Radio>
          <Radio value={4}>Radio D</Radio>
        </RadioGroup>

        <h3>当前选择的值为：{this.state.value}</h3>

      </MainContent>
    )
  }
}