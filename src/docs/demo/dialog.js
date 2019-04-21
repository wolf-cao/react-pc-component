import React, { Component } from 'react'
import { Dialog, Button, ConfirmBox } from '../../components/index'
import MainContent from '../index'
import './dialog.less'

export default class DialogDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible1: false,
      visible2: false
    }
  }

  handleEvent1 = () => {
    this.setState({
      visible1: true
    })
  }

  handleClose1 = () => {
    this.setState({
      visible1: false
    })
  }

  handleEvent2 = () => {
    this.setState({
      visible2: true
    })
  }

  handleClose2 = () => {
    this.setState({
      visible2: false
    })
  }

  handleConfirm = () => {
    ConfirmBox(
      '提示',
      '确定要删除这条数据吗？',
      () => {
        console.log('onconfirm')
      },
      () => {
        console.log('oncancel')
      }
    )
  }

  render() {
    const { visible1, visible2 } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 弹窗</h1>
        <h1 className="api-title-sub">组件例子:</h1>

        <Button type="primary" onClick={this.handleConfirm}>
          confirm
        </Button>
        <br />
        <br />

        <Button type="primary" onClick={this.handleEvent1}>
          展示弹窗 一个按钮
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.handleEvent2}>
          展示弹窗 两个按钮
        </Button>

        <Dialog
          title={<span>操作提示</span>}
          footer={
            <div className="dialog-two-button">
              <Button
                className="dialog-footer-two-button"
                size="large"
                onClick={this.handleClose2}
              >
                取消
              </Button>
              <Button
                className="dialog-footer-two-button"
                type="primary"
                size="large"
                onClick={this.handleClose2}
              >
                确定
              </Button>
            </div>
          }
          visible={visible2}
          width="370px"
          onClose={this.handleClose2}
        >
          <div className="dialog-center-content2">
            确定删除当前选中的客户信息吗？
          </div>
        </Dialog>

        <Dialog
          title={<span>温馨提示</span>}
          footer={
            <span className="dialog-one-button">
              <Button type="primary" size="large" onClick={this.handleClose1}>
                确定
              </Button>
            </span>
          }
          visible={visible1}
          width="370px"
          onClose={this.handleClose1}
        >
          <div className="dialog-center-content1">
            您提交的客户“上海管理有限公司”在系统内不存在，请检查后重新提交！
          </div>
        </Dialog>
      </MainContent>
    )
  }
}
