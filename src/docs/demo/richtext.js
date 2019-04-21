import React, { Component } from 'react'
import { Richtext } from '../../components/index'
import MainContent from '../index'

export default class RichtextDemo extends Component {
  handleChange = value => {
    console.log(value, 'value')
  }

  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 富文本</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Richtext />
      </MainContent>
    )
  }
}
