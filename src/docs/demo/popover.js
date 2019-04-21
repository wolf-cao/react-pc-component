import React, { Component } from 'react'
import { Popover } from '../../components/index'
import MainContent from '../index'

export default class PopoverDemo extends Component {
  render() {
    return (
      <MainContent >
        <h1 className="api-title">>> 气泡</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Popover
          placement="left"
          trigger={['click']}
          overlay={<span>tooltip</span>}
        >
          这是一个按钮
        </Popover>
      </MainContent>
    )
  }
}
