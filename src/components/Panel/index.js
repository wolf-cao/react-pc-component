import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../index'

class Panel extends Component {
  getComponent = () => {
    const { children, title, footer, width, hideClose } = this.props
    return (
      <div className="pft-panel">
        <div className="pft-panel-mask" onClick={this.hidePanel} />
        <div className="pft-panel-container">
          <div className="pft-panel-wrapper" style={{ width: width }}>
            <div className="pft-panel-header">
              {title || null}
              {!hideClose && (
                <span className="pft-panel-close-icon" onClick={this.hidePanel}>
                  <Icon name="cha" />
                </span>
              )}
            </div>
            <div className="pft-panel-content">{children}</div>
            {footer && <div className="pft-panel-footer">{footer}</div>}
          </div>
        </div>
      </div>
    )
  }

  hidePanel = () => {
    this.props.onClose()
  }

  render() {
    const { visible } = this.props
    return <React.Fragment>{visible && this.getComponent()}</React.Fragment>
  }
}

Panel.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.arrayOf(PropTypes.element, PropTypes.string),
  footer: PropTypes.element,
  width: PropTypes.string,
  hideClose: PropTypes.bool,
  onClose: PropTypes.func
}

Panel.defaultProps = {
  width: '80%',
  hideClose: false
}

export default Panel
