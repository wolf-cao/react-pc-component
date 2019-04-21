import React, { Component } from 'react'
import { TitleBar, Switch } from '../../components/index'
import MainContent from '../index'

export default class BadgeDemo extends Component {
  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 标题栏</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div style={{ width: '300px' }}>
          <TitleBar
            title="组织架构"
            extra={
              <Switch
                defaultValue={1}
                values={[
                  {
                    text: '展开',
                    value: 1
                  },
                  {
                    text: '收起',
                    value: 2
                  }
                ]}
                onSwitch={val => {
                  console.log(val)
                }}
              />
            }
          />
        </div>
      </MainContent>
    )
  }
}
