/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.css'
import React from 'react'
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'

import zhCN from 'rc-calendar/lib/locale/zh_CN'
import enUS from 'rc-calendar/lib/locale/en_US'
import 'rc-time-picker/assets/index.css'
import TimePickerPanel from 'rc-time-picker/lib/Panel'

import { Icon } from '../index'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'
import RangePicker from './rangeCalender'

const format = 'YYYY-MM-DD'
const cn = location.search.indexOf('cn') === -1

const now = moment()
if (cn) {
  now.locale('zh-cn').utcOffset(8)
} else {
  now.locale('en-gb').utcOffset(0)
}

function getFormat(time) {
  return time ? format : 'YYYY/MM/DD'
}

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

const timePickerElement = <TimePickerPanel />

// 作用是用来显示时间
const SHOW_TIME = false

class Picker extends React.Component {
  state = {
    showTime: SHOW_TIME,
    disabled: false
  }

  render() {
    const props = this.props
    const calendar = (
      <Calendar
        locale={cn ? zhCN : enUS}
        defaultValue={now}
        // timePicker={props.showTime ? timePickerElement : null}
        disabledDate={props.disabledDate}
      />
    )
    return (
      <DatePicker
        animation="slide-up"
        disabled={props.disabled}
        calendar={calendar}
        value={props.value}
        onChange={props.onChange}
      >
        {({ value }) => {
          return (
            <span className="pft-datepicker-input-wrap">
              <input
                className="pft-datepicker-input"
                placeholder={props.placeholder || '请选择时间'}
                disabled={props.disabled}
                readOnly
                value={(value && value.format(getFormat(props.showTime))) || ''}
              />
              <Icon className="pft-datepicker-input-icon" name="rili" />
            </span>
          )
        }}
      </DatePicker>
    )
  }
}

class DatePickerDemo extends React.Component {
  static RangePicker = RangePicker

  state = {
    value: null
  }

  disabledEndDate = endValue => {
    if (!endValue) {
      return false
    }
    const startValue = this.state.startValue
    if (!startValue) {
      return false
    }
    return SHOW_TIME
      ? endValue.isBefore(startValue)
      : endValue.diff(startValue, 'days') <= 0
  }

  onChange = value => {
    this.setState(
      {
        value: value
      },
      () => {
        if (this.props.onChange && this.state.value) {
          this.props.onChange(this.state.value)
        }
      }
    )
  }
  render() {
    const { disabledDate, ...restProps } = this.props
    const { value } = this.state
    return (
      <span>
        <Picker
          {...restProps}
          disabledDate={disabledDate}
          value={value}
          onChange={this.onChange.bind(this)}
        />
      </span>
    )
  }
}

export default DatePickerDemo
