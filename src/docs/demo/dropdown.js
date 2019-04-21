import React, { Component } from 'react'
import { Dropdown, Message } from '../../components/index'
import MainContent from '../index'

export default class DropdownDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 'car'
    }
  }

  handleSelect = value => {
    this.setState(
      {
        selectValue: value
      },
      () => {
        Message.success(`已经选择了 ${value.text}`)
      }
    )
  }

  render() {
    const { selectValue } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 下拉框</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div>
          <Dropdown
            title="欢迎：赵秀兰"
            value={selectValue}
            arrowColor="#dc7f58"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item value="car" text="汽车" />
            <Dropdown.Item value="ship" text="轮船" />
            <Dropdown.Item value="plane" text="飞机" />
          </Dropdown>
        </div>
      </MainContent>
    )
  }
}
