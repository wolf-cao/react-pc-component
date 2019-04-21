import React, { Component } from 'react'
import { Spin, Button, Checkbox } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loading1: false
    }
  }

  loadingEvent = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 3000)
      }
    )
  }

  handleChange = value => {
    this.setState({
      loading1: value
    })
  }

  render() {
    const { loading, loading1 } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 加载</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Button onClick={this.loadingEvent}>加载</Button>
        {loading && <Spin />}

        <div style={{ padding: '50px 0' }}>
          <Checkbox
            label="是否显示加载"
            checked={loading1}
            onChange={this.handleChange}
          />
          <br />
          <Spin loading={loading1}>
            <div
              style={{
                padding: '30px',
                border: '1px solid #bbb',
                backgroundColor: '#1890ff',
                color: '#fff'
              }}
            >
              <p>这是一个容器内的加载中的效果</p>
              <p>
                加载的图标是根据容器的大小，然后显示在中间位置的，你可以自由的控制你的内容元素
              </p>
            </div>
          </Spin>
        </div>
      </MainContent>
    )
  }
}
