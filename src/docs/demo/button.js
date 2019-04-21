import React, { Component } from 'react'
import { Button } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 按钮</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Button type="white" size="mini">按钮-mini</Button>
        <span style={{ marginRight: '15px' }} />
        <Button type="white">按钮-md</Button>
        <span style={{ marginRight: '15px' }} />
        <Button type="white" size="large">按钮-large</Button>
        <br />
        <br />
        <Button size="mini">按钮-mini</Button>
        <span style={{ marginRight: '15px' }} />
        <Button>按钮-md</Button>
        <span style={{ marginRight: '15px' }} />
        <Button size="large">按钮-large</Button>
        <br />
        <br />
        <Button type="primary" size="mini">
          按钮-mini
        </Button>
        <span style={{ marginRight: '15px' }} />
        <Button type="primary">按钮-md</Button>
        <span style={{ marginRight: '15px' }} />
        <Button type="primary" size="large">
          按钮-large
        </Button>
      </MainContent>
    )
  }
}
