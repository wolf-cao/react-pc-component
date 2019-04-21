import React, { Component } from 'react'
import { Input } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 输入框</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Input placeholder="请输入..." width={'220px'} />
      </MainContent>
    )
  }
}
