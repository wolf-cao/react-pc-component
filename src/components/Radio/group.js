import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

class RadioGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue
    }
  }

  setRadio = value => {
    this.props.onChange(value)
    this.setState({
      value
    })

  }

  render() {
    const { value } = this.state
    const { children, name, onChange, disabled } = this.props

    // let state = false
    
    return (

      <div>
        {React.Children.map(children, child => {

          return React.cloneElement(child, {
            value: child.props.value,
            checked: child.props.value === value ? true : false,
            name,
            onChange: this.setRadio,
            disabled
          })
        })}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool
}

RadioGroup.defaultProps = {
  defaultValue: 1,
  name: String(Math.random()),
  disabled: false
}



export default RadioGroup
