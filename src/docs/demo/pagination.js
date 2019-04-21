import React, { Component } from 'react'
import { Pagination } from '../../components/index'
import MainContent from '../index'

// import localeInfo from 'rc-pagination/lib/locale/en_US'

export default class DroptableDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 3,
      totalSize: 200,
      pageNumber: 2
    }
  }
  onChange = (value1, value2) => {}
  hahahh = () => {
    setTimeout(() => {
      this.setState({
        pageNumber: 3
      })
    }, 3000)
  }

  onChange = value => {
    this.setState({
      pageNumber: value
    })
  }

  render() {
    const { current, totalSize, pageNumber } = this.state
    // this.hahahh()
    return (
      <MainContent>
        <h1 className="api-title">>> 分页</h1>
        <h1 className="api-title-sub">简单例子:</h1>
        <Pagination
          onChange={this.onChange}
          // pageSize={10}
          pageNumber={pageNumber}
          totalSize={totalSize}
          selectionOptions={[10, 20, 30, 40]}
        />
      </MainContent>
    )
  }
}
