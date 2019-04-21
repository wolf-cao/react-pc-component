import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../index'

class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue
    }
  }

  handleSwitch(value) {
    this.setState(
      {
        value
      },
      () => {
        this.props.onSwitch(value)
      }
    )
  }

  render() {
    const { value } = this.state
    const { values, size } = this.props
    return (
      <div className="pft-switch">
        {values.map((item, index) => (
          <Button
            key={index}
            size={size}
            type={item.value === value ? 'primary' : 'normal'}
            onClick={() => {
              this.handleSwitch(item.value)
            }}
            block
          >
            {item.text}
          </Button>
        ))}
      </div>
    )
  }
}

Switch.propTypes = {
  size: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.string, PropTypes.number)
}

Switch.defaultProps = {
  size: 'mini'
}

export default Switch
