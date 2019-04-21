import React, { Component } from 'react'
import { Fileup, Input, Button, Message } from '../../components/index'
import MainContent from '../index'
import axios from 'axios'

export default class PopoverDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      fileso: [],
      url: '',
      method: '',
      response: '',
      requestKey: ''
    }
  }

  handleClick = () => {
    const { url, method, requestKey, files } = this.state
    if (!url || !method || !requestKey) {
      this.setState({
        response: 'any above param is empty'
      })
      return
    }

    let requestData = {}
    requestData[requestKey] = files

    if (method.toLowerCase() === 'get') {
      axios({
        method,
        url,
        params: requestData
      }).then(response => {
        console.log(response, 'res1')
        this.setState({
          response
        })
      })
    } else {
      axios({
        method,
        url,
        data: requestData
      }).then(response => {
        console.log(response, 'res2')
        this.setState({
          response
        })
      })
    }
  }

  onChanges = files => {
    // console.log(files)
    this.setState({
      files
    })
  }

  onChange = fileso => {
    // console.log(fileso)
    this.setState({
      fileso
    })
  }

  moreThan = value => {
    Message.fail(value ? value : '超出上传限制', () => {
      console.log('yes!!')
    })
  }

  moreSize = value => {
    Message.fail(value ? value : '超出上传尺寸限制', () => {
      console.log('yes!!')
    })
  }

  handleInputUrl = url => {
    this.setState({
      url
    })
  }

  handleInputMethod = method => {
    this.setState({
      method
    })
  }

  handleInputKey = requestKey => {
    this.setState({
      requestKey
    })
  }

  render() {
    const { files, fileso, response } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 上传</h1>
        <h1 className="api-title-sub">组件例子:</h1>

        <Input placeholder="请输入url" onInput={this.handleInputUrl} />
        <br />
        <Input placeholder="请输入get/post" onInput={this.handleInputMethod} />
        <br />
        <Input
          placeholder="请输入后端图片接受的key"
          onInput={this.handleInputKey}
        />
        <br />

        <h3>多选</h3>
        <Fileup
          maxlength={3}
          multiple={true}
          files={files}
          fileList={true}
          onChange={this.onChanges}
          moreThan={this.moreThan}
          moreSize={this.moreSize}
          fileSize={1000}
        />
        <br />

        <h3>单选</h3>
        <Fileup files={fileso} onChange={this.onChange} inputShow={true} />
        <br />

        <h3>单选单个按钮</h3>

        <Fileup
          files={fileso}
          buttonText="上传"
          onChange={this.onChange}
          explain="仅支持PDF文件，需加盖管理人几托管机构公章，不超过5M"
        />

        <br />
        <br />

        <Fileup
          maxlength={3}
          multiple={true}
          files={fileso}
          buttonText="文件浏览"
          fileList={true}
          onChange={this.upFileOnChange}
          explain="仅支持PDF文件，需加盖管理人几托管机构公章，不超过5M"
        />

        <Button type="primary" onClick={this.handleClick}>
          提交
        </Button>

        <Fileup.List />
        <Fileup.List style={false} />

        <p>{response}</p>
      </MainContent>
    )
  }
}
