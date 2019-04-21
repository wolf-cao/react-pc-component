import React, { Component } from 'react'
import { Checkbox } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkVal: false
    }
  }

  handleChange = value => {
    this.setState({
      checkVal: value
    })
  }

  render() {
    const { checkVal } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 复选框</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Checkbox
          label="这是一个复选框"
          checked={checkVal}
          onChange={this.handleChange}
        />
      </MainContent>
    )
  }
}
