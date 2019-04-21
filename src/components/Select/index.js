import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import outsideClick from 'outside-click'
import { getKeysFromArray } from '../utils/index'
import { Icon } from '../index'
import Option from './option'
import List from './list'
import SelectTable from './table'
import { closest } from '../utils/index'

class Select extends Component {
  static Option = Option

  constructor(props) {
    super(props)
    this.state = {
      isDown: false,
      listWidth: '',
      firstEnter: true
    }
    this.container = null
    this.offsetPos = {
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    this.selectComponent = ReactDOM.findDOMNode(this)
    this.setState({
      listWidth: this.selectComponent.offsetWidth
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isDown) {
      this.removeContainer()
    }
    return true
  }

  removeContainer() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container)
      this.container.parentNode.removeChild(this.container)
      this.container = null
      this.outsideClick.off()
    }
  }

  getContainer = () => {
    if (!this.container) {
      const wrapper = document.createElement('div')
      wrapper.style.position = 'absolute'
      wrapper.style.left = '0'
      wrapper.style.top = '0'
      wrapper.style.width = '100%'
      const emptyWrapper = document.createElement('div')

      const container = document.createElement('div')
      const containerId = `J_pftSelectContainer-${new Date().getTime()}`
      container.setAttribute('id', containerId)
      container.setAttribute('class', 'pft-select-dialog-wrapper')
      container.style.position = 'absolute'
      container.style.left = `${this.offsetPos.left}px`
      container.style.top = `${this.offsetPos.top + 35}px`
      container.style.zIndex = '9999'
      container.style.whiteSpace = 'nowrap'

      emptyWrapper.appendChild(container)
      wrapper.appendChild(emptyWrapper)
      document.body.appendChild(wrapper)
      this.container = container
      this.outsideClick = outsideClick(this.container, this.handleClickOutside)
    }
    return this.container
  }

  getComponent = () => {
    const { listWidth, isDown, firstEnter } = this.state
    const {
      mode,
      children,
      defaultValue,
      value,
      sourceData,
      transformKeys,
      onlyId,
      columns
    } = this.props

    const selectOptionsClass = Classnames('pft-select-options', {
      [`fn-hide`]: !isDown
    })
    const selectCascaderClass = Classnames('pft-select-option-list', {
      [`fn-hide`]: !isDown
    })

    let dropElement = null
    if (mode === 'normal') {
      dropElement = (
        <ul
          className={selectOptionsClass}
          style={{ minWidth: `${listWidth}px` }}
        >
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              activeValue: firstEnter ? value || defaultValue : value,
              value: child.props.value,
              handleSelectEvent: this.handleSelect
            })
          })}
        </ul>
      )
    } else if (mode === 'tree') {
      dropElement = (
        <div
          className={selectCascaderClass}
          ref={ref => (this.selectTreeList = ref)}
        >
          <List
            sourceData={sourceData}
            filterKey={transformKeys.value}
            onListSelect={this.handleSelect}
            transformKeys={transformKeys}
          />
        </div>
      )
    } else if (mode === 'table') {
      dropElement = (
        <div className={selectOptionsClass}>
          <SelectTable
            onlyId={onlyId}
            sourceData={sourceData}
            columns={columns}
            checkedData={firstEnter ? value || defaultValue : value}
            onCheckChange={this.handleCheck}
          />
        </div>
      )
    }

    return dropElement
  }

  triggerSelect = evt => {
    const selectDom = closest(evt.target, '.pft-select')
    const offsetPos = selectDom.getBoundingClientRect()
    const { isDown } = this.state
    this.offsetPos = offsetPos
    this.setState({
      isDown: !isDown
    })
  }

  handleClickOutside = evt => {
    this.setState({
      isDown: false
    })
  }

  handleCheck = value => {
    console.log(value, 'checkchange')
    const { formatOrder } = this.props
    this.props.onChange(formatOrder(value))
  }

  handleClearValue = evt => {
    evt.stopPropagation()
    this.setState(
      {
        firstEnter: false
      },
      () => {
        this.handleSelect('')
      }
    )
  }

  handleSelect = value => {
    const { transformKeys, selectSingle, mode } = this.props

    this.setState(
      {
        isDown: false
      },
      () => {
        if (mode === 'tree') {
          let selectValue = value
            ? value.map(item => item[transformKeys.value])
            : ''
          if (selectSingle) {
            selectValue = selectValue[selectValue.length - 1]
          }

          this.props.onChange(selectValue)
          return
        }

        this.props.onChange(value)
      }
    )
  }

  getText = val => {
    const { children, mode, sourceData, transformKeys } = this.props
    if (!val && val !== 0) return ''

    let selectText = ''

    if (mode === 'normal') {
      children.map(child => {
        if (val === child.props.value) {
          selectText = child.props.text
        }
      })
      return selectText
    }

    if (mode === 'table') {
      if (sourceData.length < 1) {
        return ''
      }

      return val
        .map(itemValue => {
          return sourceData.filter(
            sd => sd[transformKeys.value] === itemValue
          )[0][transformKeys.text]
        })
        .join('、')
    }

    return getKeysFromArray(
      sourceData,
      val,
      transformKeys.children,
      transformKeys.value,
      transformKeys.text
    ).join('/')
  }

  render() {
    const { isDown, firstEnter } = this.state
    const {
      children,
      value,
      defaultValue,
      placeholder,
      error,
      width,
      ...restProps
    } = this.props

    const { explain } = restProps

    const selectInputClass = Classnames('pft-select-input-box', {
      [`pft-select-input-focus`]: isDown,
      [`pft-select-is-error`]: error
    })
    const selectInputValueClass = Classnames('pft-select-input-value', {
      [`pft-select-input-placeholder`]: firstEnter
        ? (value === undefined || !value.toString()) &&
          (defaultValue === undefined || !defaultValue.toString())
        : value === undefined || !value.toString()
    })
    const selectArrowClass = Classnames('pft-select-input-arrow', {
      [`pft-select-input-arrow-down`]: isDown,
      [`pft-select-input-clear`]: firstEnter
        ? value || value === 0 || defaultValue || defaultValue === 0
        : value || value === 0
    })

    const explainElement = explain ? (
      <div className={`pft-select-explain`}>{explain}</div>
    ) : null

    const errorElement = error ? (
      <div className="pft-select-error">
        <Icon name="shibai" className="pft-select-error-icon" />
        {error}
      </div>
    ) : null

    return (
      <div className="pft-select" style={{ width: `${width}` }}>
        <div className={selectInputClass} onClick={this.triggerSelect}>
          <span
            className={selectInputValueClass}
            title={
              this.getText(firstEnter ? value || defaultValue : value) ||
              placeholder
            }
          >
            {this.getText(firstEnter ? value || defaultValue : value) ||
              placeholder}
            <input
              {...restProps}
              value={firstEnter ? value || defaultValue : value}
              type="text"
              className="pft-select-input"
            />
          </span>
          <div className={selectArrowClass}>
            <Icon
              name="sm-icon-error"
              className="delete-icon"
              onClick={this.handleClearValue}
            />
            <Icon name="xiangxiafanye" className="select-icon" />
          </div>
        </div>
        {isDown &&
          ReactDOM.createPortal(this.getComponent(), this.getContainer())}
        {errorElement || explainElement}
      </div>
    )
  }
}

Select.propTypes = {
  mode: PropTypes.string,
  onlyId: PropTypes.string,
  value: PropTypes.string,
  transformKeys: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  sourceData: PropTypes.array,
  columns: PropTypes.array,
  onChange: PropTypes.func,
  selectSingle: PropTypes.bool
}

Select.defaultProps = {
  mode: 'normal',
  placeholder: '请选择',
  selectSingle: true,
  sourceData: [],
  columns: [],
  transformKeys: {
    text: 'text',
    value: 'value',
    children: 'children'
  },
  defaultValue: ''
}

export default Select
