import React, { Component } from 'react'
import { Uploader, Message, Icon, Button } from '../../components/index'
import MainContent from '../index'

export default class UploaderDemo extends Component {
  render() {
    const props = {
      name: 'file543',
      action: 'http://192.168.1.182:3000/upload',
      headers: {
        authorization: 'authorization-text'
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          Message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          Message.fail(`${info.file.name} file upload failed.`)
        }
      }
    }

    return (
      <MainContent>
        <h1 className="api-title">>> 上传</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Uploader {...props}>
          <Button>
            <Icon name="upload" /> Click to Upload
          </Button>
        </Uploader>
      </MainContent>
    )
  }
}
