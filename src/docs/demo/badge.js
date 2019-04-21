import React, { Component } from 'react'
import { Badge, Icon } from '../../components/index'
import MainContent from '../index'
import './badge.less'

export default class BadgeDemo extends Component {
  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 徽标数</h1>
        <h1 className="api-title-sub">组件例子1:</h1>
        <Badge value="99" type="error" offset={[-8, -16]}>
          <Icon className="zan" name="weixin" />
        </Badge>
        <h4 className="api-title-sub" />
        <h1 className="api-title-sub">组件例子2:</h1>
        <Badge type="error" value="99" />
        <Badge type="success" value="99" />
        <Badge type="warning" value="99" />
      </MainContent>
    )
  }
}
