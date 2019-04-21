import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { Icon, Input, Table } from '../index'
// import Option from './option'

class Droptable extends Component {
  // static Option = Option

  constructor(props) {
    super(props)
    this.state = {
      isDown: true
    }
  }

  triggerSelect = () => {
    const { isDown } = this.state
    this.setState({
      isDown: !isDown
    })
  }

  handleClickOutside = () => {
    this.setState({
      isDown: false
    })
  }

  handleSelect = value => {
    this.setState(
      {
        isDown: false
      },
      () => {
        this.props.onSelect(value)
      }
    )
  }

  render() {
    const { isDown } = this.state
    const {
      children,
      value,
      placeholder,
      defaultValue,
      sourceData,
      columns,
      ...restProps
    } = this.props
    console.log(sourceData, '9876')

    const selectInputClass = Classnames('pft-select-input-box', {
      [`pft-select-input-focus`]: isDown
    })

    const selectInputValueClass = Classnames('pft-select-input-value', {
      [`pft-select-input-placeholder`]: !value
    })

    const selectArrowClass = Classnames('pft-select-input-arrow', {
      [`pft-select-input-arrow-down`]: isDown
    })

    const selectOptionsClass = Classnames('pft-select-options', {
      [`fn-hide`]: !isDown
    })

    return (
      <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
        <div className="pft-select">
          <div onClick={this.triggerSelect}>
            <Input {...restProps} value={value || defaultValue} type="text" />
          </div>
          <div className={selectOptionsClass}>
            <Table  dataSource={sourceData} columns={columns} />
          </div>
        </div>
      </OutsideClickHandler>
    )
  }
}

Droptable.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
}

export default Droptable
