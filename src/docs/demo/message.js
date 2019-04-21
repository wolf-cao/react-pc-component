import React, { Component } from 'react'
import { Message, Button } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  infor = () => {
    Message.info('这是一个需要你特别注意的提示', () => {
      console.log('yes!!')
    })
  }

  success = () => {
    Message.success('这是一个需要你特别注意的提示', () => {
      console.log('yes!!')
    })
  }

  fail = () => {
    Message.fail('这是一个需要你特别注意的提示', () => {
      console.log('yes!!')
    })
  }

  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 提示</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div>
          <Button onClick={this.infor}>提示</Button>
        </div>
        <br />
        <div>
          <Button onClick={this.success}>成功</Button>
        </div>
        <br />
        <div>
          <Button onClick={this.fail}>错误</Button>
        </div>
      </MainContent>
    )
  }
}
