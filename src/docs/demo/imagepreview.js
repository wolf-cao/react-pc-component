import React, { Component } from 'react'
import { ImagePreview } from '../../components/index'
import MainContent from '../index'

export default class ImagePreviewDemo extends Component {
  handlePreview = evt => {
    ImagePreview.preview(evt.target.src)
  }

  render() {
    return (
      <MainContent>
        <h1 className="api-title">>> 图片预览</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <img
          src="https://github.com/wolf-cao/my-images/blob/master/cuslist.PNG?raw=true"
          height="100"
          onClick={this.handlePreview}
        />
      </MainContent>
    )
  }
}
