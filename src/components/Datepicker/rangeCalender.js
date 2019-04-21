import 'rc-calendar/assets/index.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import DatePicker from 'rc-calendar/lib/Picker'
import PropTypes from 'prop-types'
import { Icon } from '../index'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
import enUS from 'rc-calendar/lib/locale/en_US'

import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'

const cn = location.search.indexOf('cn') === -1
const now = moment()
if (cn) {
  now.locale('zh-cn').utcOffset(8)
} else {
  now.locale('en-gb').utcOffset(0)
}

export default class RangeDateDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverValue: [],
      open: false,
      startValue: '',
      endValue: '',
      showDate: '',
      clickTime: 0,
      value:
        (props.value && props.value.length > 0 && props.value) ||
        (props.defaultValue &&
          props.defaultValue.length > 0 &&
          props.defaultValue) ||
        []
    }
  }

  onHoverChange = hoverValue => {
    // this.setState({ hoverValue })
  }

  // 用来控制显示
  onOpenChange = value => {
    this.setState({
      open: value
    })
  }

  onStartChange = value => {
    this.setState(
      {
        value: value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(value)
        }
      }
    )
  }

  timePickerElement = () => {
    const { showSecond } = this.state
    return (
      <TimePickerPanel
        showSecond={showSecond}
        defaultValue={moment('00:00:00', 'HH:mm:ss')}
      />
    )
  }

  // 鼠标移动时经过的值
  handleHoverChange = hoverValue => this.setState({ hoverValue })

  render() {
    const props = this.props
    const { showValue, width, format, showTime, showSecond } = props
    const { open, startValue, endValue, hoverValue, value } = this.state
    const calendar = (
      <RangeCalendar
        timePicker={showTime ? this.timePickerElement() : null}
        showDateInput={true}
        showOk={true}
        locale={cn ? zhCN : enUS}
        hoverValue={hoverValue}
        defaultValue={now}
        format={format}
        onValueChange={this.handleShowDateChange}
        onHoverChange={this.handleHoverChange}
      />
    )
    return (
      <div className="pft-RangeCalendar-all-wrap">
        <DatePicker
          open={open}
          onOpenChange={this.onOpenChange}
          onChange={this.onStartChange}
          calendar={calendar}
          value={value}
        >
          {() => {
            return (
              <span
                className="pft-RangeCalendar-wrap"
                style={{ width: `${width}` }}
              >
                <input
                  placeholder={this.props.placeholder[0]}
                  readOnly
                  value={(value[0] && value[0].format(this.props.format)) || ''}
                />
                <span>~</span>
                <input
                  placeholder={this.props.placeholder[1]}
                  readOnly
                  value={(value[1] && value[1].format(this.props.format)) || ''}
                />
                <Icon className="pft-datepicker-input-icon" name="rili" />
              </span>
            )
          }}
        </DatePicker>
      </div>
    )
  }
}

RangeDateDemo.defaultProps = {
  placeholder: ['开始时间', '结束时间'],
  format: 'YYYY/MM/DD',
  defaultValues: [],
  value: [],
  showTime: false
}

RangeDateDemo.propTypes = {
  placeholder: PropTypes.Array,
  format: PropTypes.string,
  defaultValue: PropTypes.array,
  value: PropTypes.array,
  showTime: PropTypes.bool
}
