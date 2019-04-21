import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Icon } from '../index'

function noop() {}

class FileupList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { index, fileName, style } = this.props

    // let state = false

    return (
      <p className="pft-fileup-list">
        <span className="pft-fileup-name">
          <strong>{index}</strong>
          {fileName}
        </span>
        {style ? (
          <span
            className="pft-fileup-btn pft-fileup-btn-remove"
            onClick={this.props.removeFile}
          >
            <Icon name="shanchu" />
            删除
          </span>
        ) : (
          <span
            className="pft-fileup-btn pft-fileup-btn-remove-icon"
            onClick={this.props.removeFile}
          >
            <Icon name="guoqi" />
          </span>
        )}
      </p>
    )
  }
}

FileupList.propTypes = {}

FileupList.defaultProps = {
  index: '1',
  fileName: '文件名',
  removeFile: noop,
  style: true
}

export default FileupList
