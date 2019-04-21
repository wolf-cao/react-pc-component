import React, { Component } from 'react'
import { AutoComplete } from '../../components/index'
import MainContent from '../index'

export default class BadgeDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      dataSource: []
    }
  }

  handleChange = evt => {
    const value = evt.target.value
    this.setState({
      value,
      dataSource: !value ? [] : [value, value + value, value + value + value]
    })
  }

  handleSelect = value => {
    this.setState({
      value
    })
  }

  render() {
    const { value, dataSource } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 自动补全</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div style={{ float: 'left' }}>
          <AutoComplete
            dataSource={dataSource}
            onChange={this.handleChange}
            onAutoSelect={this.handleSelect}
            value={value}
          />
        </div>
      </MainContent>
    )
  }
}
