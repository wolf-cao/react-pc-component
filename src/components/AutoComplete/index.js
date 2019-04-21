import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OutsideClickHandler from 'react-outside-click-handler'
import { Input } from '../index'
import DropMenus from './dropmenu'

class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDown: false,
      isSelect: false,
      listWidth: ''
    }
  }

  componentDidMount() {
    this.autoComponent = ReactDOM.findDOMNode(this)
    this.setState({
      listWidth: this.autoComponent.offsetWidth
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.dataSource !== this.props.dataSource
    ) {
      if (this.state.isSelect) {
        this.setState({
          isDown: false
        })
        return true
      }
      this.setState({
        isDown: true
      })
      return true
    }

    if (nextState.isDown !== this.state.isDown) {
      this.setState({
        isDown: nextState.isDown
      })
      return true
    }

    if (nextProps.error !== this.props.error) {
      return true
    }

    return false
  }

  handleSelect = value => {
    this.setState(
      {
        isDown: false,
        isSelect: true
      },
      () => {
        this.props.onAutoSelect(value)
        this.setState({
          isSelect: false
        })
      }
    )
  }

  handleClickOutside = () => {
    this.setState({
      isDown: false
    })
  }

  handleFocus = () => {
    const { value } = this.props
    if (value) {
      this.setState({
        isDown: true
      })
    }
  }

  render() {
    const { listWidth, isDown } = this.state
    const { dataSource, value, placeholder, ...restProps } = this.props
    const { error } = restProps

    return (
      <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
        <div className="pft-autocomplete">
          <Input
            value={value && (value.text || value)}
            onFocus={this.handleFocus}
            placeholder={placeholder}
            error={error}
            {...restProps}
          />
          <DropMenus
            visible={isDown}
            listWidth={listWidth}
            dataSource={dataSource}
            onSelect={this.handleSelect}
          />
        </div>
      </OutsideClickHandler>
    )
  }
}

AutoComplete.defaultProps = {
  dataSource: [],
  placeholder: '请输入...'
}

export default AutoComplete
