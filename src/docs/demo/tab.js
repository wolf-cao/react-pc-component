import React, { Component } from 'react'
import { Tab } from '../../components/index'
import MainContent from '../index'

export default class TabDemo extends Component {
  handleTabClick = key => {
    console.log('key:', key)
  }

  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 标签页</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Tab defaultKey={0} onTabChange={this.handleTabClick}>
          <Tab.Item title="待审核">tab1</Tab.Item>
        </Tab>

        <Tab defaultKey={0} onTabChange={this.handleTabClick}>
          <Tab.Item title="待审核">tab1</Tab.Item>
          <Tab.Item title="已审核">tab2</Tab.Item>
          <Tab.Item title="已完成">tab3</Tab.Item>
        </Tab>
      </MainContent>
    )
  }
}
