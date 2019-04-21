import React, { Component } from 'react'
import { Breadcrumb } from '../../components/index'
import MainContent from '../index'

export default class BreadcrumbsPage extends Component {
  render() {
    const breadcrumbData = [
      {
        text: '首页',
        value: '/'
      },
      {
        text: '新闻资讯',
        value: '/news'
      },
      {
        text: '焦点新闻',
        value: '/news/point'
      },
      {
        text: '消息称京东2019年将末位淘汰10%的高管',
        value: ''
      }
    ]
    return (
      <MainContent>
        <h1 className="api-title">>> 面包屑</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <span style={{ float: 'left' }}>当前位置:</span>
        <Breadcrumb data={breadcrumbData} />
      </MainContent>
    )
  }
}
