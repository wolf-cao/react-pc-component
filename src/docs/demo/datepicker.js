import React, { Component } from 'react'
import { DatePicker } from '../../components/index'
import MainContent from '../index'
const { RangePicker } = DatePicker

export default class CalendarDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      startValue: null,
      endValue: null
    }
  }

  onStartChange = value => {
    this.onChange1('startValue', value)
  }

  onEndChange = value => {
    this.onChange1('endValue', value)
  }

  onChange1 = value => {
    // console.log(value)
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = endValue => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() < startValue.valueOf()
  }

  onChange = value1 => {
    this.setState({
      startValue: value1.startTime,
      endValue: value1.endTime
    })
  }

  render() {
    const { startValue, endValue, value } = this.state
    return (
      <MainContent>
        <h1 className="api-title">>> 日历</h1>
        <h3>简单的日期选择:</h3>
        <div style={{ width: '300px' }}>
          <RangePicker
            showTime={true}
            showSecond={false}
            // defaultValue={[moment('2018/10/08'), moment('2018/10/12')]}
            // value={[startValue, endValue]}
            format={'YYYY/MM/DD'}
            placeholder={['开始时间', '结束时间']}
            width={'200px'}
            onChange={this.onChange1}
          />
        </div>
        <h3 style={{ marginTop: 30 }}>区间时间的选择:</h3>
        <span>
          开始时间：
          <DatePicker
            disabledDate={this.disabledStartDate}
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
          />
        </span>
        <span style={{ marginLeft: 40 }}>
          结束时间：
          <DatePicker
            disabledDate={this.disabledEndDate}
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
          />
        </span>
      </MainContent>
    )
  }
}
