import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Icon, Button, Input } from '../index'
import FileupList from './list'

function noop() {}

class Fileup extends Component {
  static List = FileupList

  constructor(props) {
    super(props)
    this.state = {
      inputText: ''
    }
  }

  onFileChange = () => {
    const fileSelectorEl = this.fileSelectorInput
    if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
      const files = fileSelectorEl.files
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        console.log('读取文件')
        console.log(files[i].size)
        if (files[i].size > this.props.fileSize * 1000) {
          console.log('超出文件最大限制：', this.props.fileSize, 'kb')
          if (this.props.moreThan) {
            this.props.moreSize()
          }
        } else {
          this.parseFile(files[i], i)
        }
      }
    }
    if (fileSelectorEl) {
      fileSelectorEl.value = ''
    }
  }

  parseFile = (file, index) => {
    // 读取文件
    const reader = new FileReader()
    reader.onload = e => {
      console.log(e)

      const dataURL = e.target.result
      if (!dataURL) {
        if (this.props.onFail) {
          this.props.onFail(`Fail to get the ${index} file`)
        }
        console.log('加载失败')
        return
      }

      this.addFile({
        url: dataURL,
        // orientation,
        file
      })
    }
    reader.readAsDataURL(file)
  }

  removeFile = index => {
    const newFiles = []
    const { files = [] } = this.props
    files.forEach((fileItem, idx) => {
      if (index !== idx) {
        newFiles.push(fileItem)
      }
    })
    if (this.props.onChange) {
      this.props.onChange(newFiles)
    }
  }

  addFile = fileItem => {
    const { files = [] } = this.props
    let mark = false
    files.forEach((file, idx) => {
      if (fileItem.file.name === file.file.name) {
        mark = true
      }
    })
    if (mark) {
      return
    }

    console.log('新加的：', fileItem)

    let newFiles = files.concat(fileItem)

    // 单文件
    if (!this.props.fileList) {
      newFiles = []
      newFiles.push(fileItem)
      this.setState({
        inputText: fileItem.file.name
      })
    }

    console.log('+++++')
    console.log(newFiles)

    if (newFiles.length > this.props.maxlength) {
      if (this.props.moreThan) {
        this.props.moreThan()
      }
      // return
    }

    if (this.props.onChange) {
      this.props.onChange(newFiles)
    }
  }

  addBtn = () => {
    if (
      !(
        this.props.maxlength > this.props.files.length && this.props.fileList
      ) &&
      this.props.fileList
    ) {
      if (this.props.moreThan) {
        this.props.moreThan()
      }
    }
  }

  render() {
    const {
      files = [],
      fileItemShow,
      fileList,
      accept,
      multiple,
      buttonText,
      maxlength,
      inputShow,
      explain
    } = this.props

    const { inputText } = this.state

    const fileItemList = []

    files.forEach((fileItem, index) => {
      console.log(fileItem)
      fileItemList.push(
        <FileupList
          index={index + 1}
          fileName={fileItem.file.name}
          removeFile={() => {
            this.removeFile(index)
          }}
        />
        // <p className="pft-fileup-list">
        //   <span className="pft-fileup-name">
        //     <strong>#{index + 1}</strong>
        //     {fileItem.file.name}
        //   </span>
        //   <span
        //     className="pft-fileup-btn"
        //     onClick={() => {
        //       this.removeFile(index)
        //     }}
        //   >
        //     <Icon name="shanchu" />
        //     删除
        //   </span>
        // </p>
      )
    })

    return (
      <div className="pft-fileup-wrapper">
        {inputShow ? <input type="text" value={inputText} readonly /> : null}

        <span className="pft-fileup-btn" onClick={this.addBtn}>
          <Button type="white" size="md">
            {buttonText}
          </Button>
          {/* <span></span> */}
          {(maxlength > files.length && fileList) || !fileList ? (
            <input
              ref={input => {
                if (input) {
                  this.fileSelectorInput = input
                }
              }}
              type="file"
              accept={accept}
              // tslint:disable-next-line:jsx-no-multiline-js
              onChange={() => {
                this.onFileChange()
              }}
              multiple={multiple}
            />
          ) : null}
        </span>

        {fileItemShow && fileList ? fileItemList : null}
        {explain ? (
          <p className="pft-fileup-explain-text">
            <span>* </span>
            {explain}
          </p>
        ) : null}
      </div>
    )
  }
}

Fileup.propTypes = {}

Fileup.defaultProps = {
  files: [],
  fileItemShow: true,
  fileList: false,
  multiple: false,
  maxlength: 1,
  accept: '.doc,.pdf,.docx',
  onChange: noop,
  buttonText: '文件浏览',
  inputShow: false,
  onFail: noop,
  moreThan: noop,
  moreSize: noop,
  explain: '',
  fileSize: 300
}

export default Fileup
