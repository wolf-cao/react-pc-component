import * as React from 'react'
import { polyfill } from 'react-lifecycles-compat'
import RcUpload from 'rc-upload'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import uniqBy from 'lodash/uniqBy'
import findIndex from 'lodash/findIndex'
import Dragger from './dragger'
import UploadList from './uploaderList'
import {
  T,
  fileToObject,
  genPercentAdd,
  getFileItem,
  removeFileItem
} from './utils'

class Upload extends React.Component {
  static Dragger = Dragger

  static defaultProps = {
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    className: '',
    disabled: false,
    supportServerRender: true
  }

  static getDerivedStateFromProps(nextProps) {
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || []
      }
    }
    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop'
    }
  }

  componentWillUnmount() {
    this.clearProgressTimer()
  }

  onStart = file => {
    const targetItem = fileToObject(file)
    targetItem.status = 'uploading'

    const nextFileList = this.state.fileList.concat()

    const fileIndex = findIndex(
      nextFileList,
      ({ uid }) => uid === targetItem.uid
    )
    if (fileIndex === -1) {
      nextFileList.push(targetItem)
    } else {
      nextFileList[fileIndex] = targetItem
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList
    })
    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem)
    }
  }

  autoUpdateProgress(_, file) {
    const getPercent = genPercentAdd()
    let curPercent = 0
    this.clearProgressTimer()
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent)
      this.onProgress(
        {
          percent: curPercent * 100
        },
        file
      )
    }, 200)
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer()
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }
    const fileList = this.state.fileList
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.status = 'done'
    targetItem.response = response
    this.onChange({
      file: { ...targetItem },
      fileList
    })
  }

  onProgress = (e, file) => {
    const fileList = this.state.fileList
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.percent = e.percent
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList
    })
  }

  onError = (error, response, file) => {
    this.clearProgressTimer()
    const fileList = this.state.fileList
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'
    this.onChange({
      file: { ...targetItem },
      fileList
    })
  }

  handleRemove(file) {
    const { onRemove } = this.props
    const { status } = file

    file.status = 'removed' // eslint-disable-line

    Promise.resolve(
      typeof onRemove === 'function' ? onRemove(file) : onRemove
    ).then(ret => {
      // Prevent removing file
      if (ret === false) {
        file.status = status
        return
      }

      const removedFileList = removeFileItem(file, this.state.fileList)
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList
        })
      }
    })
  }

  handleManualRemove = file => {
    if (this.upload) {
      this.upload.abort(file)
    }
    this.handleRemove(file)
  }

  onChange = info => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList })
    }

    const { onChange } = this.props
    if (onChange) {
      onChange(info)
    }
  }

  onFileDrop = e => {
    this.setState({
      dragState: e.type
    })
  }

  beforeUpload = (file, fileList) => {
    if (!this.props.beforeUpload) {
      return true
    }
    const result = this.props.beforeUpload(file, fileList)
    if (result === false) {
      this.onChange({
        file,
        fileList: uniqBy(
          this.state.fileList.concat(fileList.map(fileToObject)),
          item => item.uid
        )
      })
      return false
    }
    if (result && result.then) {
      return result
    }
    return true
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer)
  }

  saveUpload = node => {
    this.upload = node
  }

  renderUploadList = locale => {
    const { showUploadList, listType, onPreview } = this.props
    const { showRemoveIcon, showPreviewIcon } = showUploadList
    console.log(this.state.fileList)
    return (
      <UploadList
        listType={listType}
        items={this.state.fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        locale={{ ...locale, ...this.props.locale }}
      />
    )
  }

  renderUpload = () => {
    const {
      className,
      showUploadList,
      listType,
      type,
      disabled,
      children
    } = this.props

    const prefixCls = classNames('pf-upload')

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      prefixCls,
      beforeUpload: this.beforeUpload
    }

    delete rcUploadProps.className

    const uploadList = showUploadList ? (
      <div>{this.renderUploadList()}</div>
    ) : null

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(
          file => file.status === 'uploading'
        ),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled
      })
      return (
        <span className={className}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload
              {...rcUploadProps}
              ref={this.saveUpload}
              className={`${prefixCls}-btn`}
            >
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      )
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled
    })

    // Remove id to avoid open by label when trigger is hidden
    // https://github.com/ant-design/ant-design/issues/14298
    if (!children) {
      delete rcUploadProps.id
    }

    const uploadButton = (
      <div
        className={uploadButtonCls}
        style={children ? undefined : { display: 'none' }}
      >
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </div>
    )

    if (listType === 'picture-card') {
      return (
        <span className={className}>
          {uploadList}
          {uploadButton}
        </span>
      )
    }
    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    )
  }

  render() {
    return this.renderUpload()
  }
}

polyfill(Upload)

Upload.propTypes = {
  recentUploadStatus: PropTypes.any,
  progressTimer: PropTypes.any,
  upload: PropTypes.any
}

export default Upload
