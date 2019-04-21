import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { Icon } from '../index'
import Item from './option'

class Dropdown extends Component {
  static Item = Item

  constructor(props) {
    super(props)
    this.state = {
      isDown: false
    }
  }

  triggerSelect = evt => {
    evt.stopPropagation()
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

  handleSelect = (evt, value) => {
    evt.stopPropagation()
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
    const { children, value, title, arrowColor, border } = this.props

    const dropdownInputClass = Classnames('pft-dropdown-input-box', {
      [`pft-dropdown-input-focus`]: isDown,
      [`pft-dropdown-has-border`]: border
    })
    const dropdownInputValueClass = Classnames('pft-dropdown-input-value', {
      [`pft-dropdown-input-placeholder`]: !value
    })
    const dropdownArrowClass = Classnames('pft-dropdown-input-arrow', {
      [`pft-dropdown-input-arrow-down`]: isDown
    })
    const dropdownOptionsClass = Classnames('pft-dropdown-items', {
      [`fn-hide`]: !isDown
    })

    return (
      <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
        <div className="pft-dropdown">
          <div className={dropdownInputClass} onClick={this.triggerSelect}>
            <span className={dropdownInputValueClass}>{title}</span>
            <Icon
              name="xiangxiafanye"
              color={arrowColor}
              className={dropdownArrowClass}
            />
          </div>
          <div className={dropdownOptionsClass}>
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                activeValue: value.val,
                value: child.props.value,
                handleDropdownEvent: this.handleSelect
              })
            })}
          </div>
        </div>
      </OutsideClickHandler>
    )
  }
}

Dropdown.propTypes = {
  value: PropTypes.string,
  border: PropTypes.bool,
  title: PropTypes.string,
  onSelect: PropTypes.func,
  arrowColor: PropTypes.string
}

Dropdown.defaultProps = {
  arrowColor: '#ccc',
  border: false
}

export default Dropdown
