import * as React from 'react'
import Animate from 'rc-animate'
import classNames from 'classnames'
import { Icon } from '../index'
// import Tooltip from '../tooltip'
// import Progress from '../progress'

const imageTypes = [
  'image',
  'webp',
  'png',
  'svg',
  'gif',
  'jpg',
  'jpeg',
  'bmp',
  'dpg'
]
const extname = url => {
  if (!url) {
    return ''
  }
  const temp = url.split('/')
  const filename = temp[temp.length - 1]
  const filenameWithoutSuffix = filename.split(/#|\?/)[0]
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}
const isImageUrl = file => {
  if (imageTypes.includes(file.type)) {
    return true
  }
  const url = file.thumbUrl || file.url
  const extension = extname(url)
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(extension)
  ) {
    return true
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false
  } else if (extension) {
    // other file types which have extension
    return false
  }
  return true
}

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'text', // or picture
    progressAttr: {
      strokeWidth: 2,
      showInfo: false
    },
    showRemoveIcon: true,
    showPreviewIcon: true
  }

  handleClose = file => {
    const { onRemove } = this.props
    if (onRemove) {
      onRemove(file)
    }
  }

  handlePreview = (file, e) => {
    const { onPreview } = this.props
    if (!onPreview) {
      return
    }
    e.preventDefault()
    return onPreview(file)
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  previewFile = (file, callback) => {
    if (file.type && !imageTypes.includes(file.type)) {
      callback('')
    }
    const reader = new FileReader()
    reader.onloadend = () => callback(reader.result)
    reader.readAsDataURL(file)
  }

  componentDidUpdate() {
    if (
      this.props.listType !== 'picture' &&
      this.props.listType !== 'picture-card'
    ) {
      return
    }
    ;(this.props.items || []).forEach(file => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window.FileReader ||
        !window.File ||
        !(file.originFileObj instanceof File) ||
        file.thumbUrl !== undefined
      ) {
        return
      }
      file.thumbUrl = ''
      this.previewFile(file.originFileObj, previewDataUrl => {
        file.thumbUrl = previewDataUrl
        this.forceUpdate()
      })
    })
  }

  renderUploadList = () => {
    const {
      items = [],
      listType,
      showPreviewIcon,
      showRemoveIcon,
      locale
    } = this.props
    const prefixCls = classNames('pft-upload')
    const list = items.map(file => {
      let progress
      let icon = (
        <Icon name={file.status === 'uploading' ? 'loading' : 'huixingzhen'} />
      )

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = (
            <div className={`${prefixCls}-list-item-uploading-text`}>
              {locale.uploading}
            </div>
          )
        } else if (!file.thumbUrl && !file.url) {
          icon = (
            <Icon
              className={`${prefixCls}-list-item-thumbnail`}
              name="xingzhuang-tupian"
            />
          )
        } else {
          const thumbnail = isImageUrl(file) ? (
            <img src={file.thumbUrl || file.url} alt={file.name} />
          ) : (
            <Icon
              name="icon_shiyongwendang"
              className={`${prefixCls}-list-item-icon`}
            />
          )
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
              href={file.url || file.thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {thumbnail}
            </a>
          )
        }
      }

      if (file.status === 'uploading') {
        // show loading icon if upload progress listener is disabled
        const loadingProgress =
          'percent' in file ? (
            // <Progress
            //   type="line"
            //   {...this.props.progressAttr}
            //   percent={file.percent}
            // />
            <span>loading...</span>
          ) : null

        progress = (
          <div className={`${prefixCls}-list-item-progress`} key="progress">
            {loadingProgress}
          </div>
        )
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true
      })
      const linkProps =
        typeof file.linkProps === 'string'
          ? JSON.parse(file.linkProps)
          : file.linkProps
      const preview = file.url ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={`${prefixCls}-list-item-name`}
          title={file.name}
          {...linkProps}
          href={file.url}
          onClick={e => this.handlePreview(file, e)}
        >
          {file.name}
        </a>
      ) : (
        <span
          className={`${prefixCls}-list-item-name`}
          onClick={e => this.handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </span>
      )
      const style = {
        pointerEvents: 'none',
        opacity: 0.5
      }
      const previewIcon = showPreviewIcon ? (
        <a
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={file.url || file.thumbUrl ? undefined : style}
          onClick={e => this.handlePreview(file, e)}
          title={locale.previewFile}
        >
          <Icon name="eye" />
        </a>
      ) : null
      const removeIcon = showRemoveIcon ? (
        <Icon
          name="shanchu"
          title={locale.removeFile}
          onClick={() => this.handleClose(file)}
        />
      ) : null
      const removeIconClose = showRemoveIcon ? (
        <Icon
          name="cha"
          title={locale.removeFile}
          onClick={() => this.handleClose(file)}
        />
      ) : null
      const actions =
        listType === 'picture-card' && file.status !== 'uploading' ? (
          <span className={`${prefixCls}-list-item-actions`}>
            {previewIcon}
            {removeIcon}
          </span>
        ) : (
          removeIconClose
        )
      let message
      if (file.response && typeof file.response === 'string') {
        message = file.response
      } else {
        message = (file.error && file.error.statusText) || locale.uploadError
      }
      const iconAndPreview =
        file.status === 'error' ? (
          // <Tooltip title={message}>
          //   {icon}
          //   {preview}
          // </Tooltip>
          <span>
            {icon}
            {preview}
          </span>
        ) : (
          <span>
            {icon}
            {preview}
          </span>
        )

      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
          {actions}
          <Animate transitionName="fade" component="">
            {progress}
          </Animate>
        </div>
      )
    })
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true
    })
    const animationDirection =
      listType === 'picture-card' ? 'animate-inline' : 'animate'
    return (
      <Animate
        transitionName={`${prefixCls}-${animationDirection}`}
        component="div"
        className={listClassNames}
      >
        {list}
      </Animate>
    )
  }

  render() {
    return this.renderUploadList()
  }
}
