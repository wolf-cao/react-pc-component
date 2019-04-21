import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Select, Button } from '../index'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 当前的页
      pageIndex: 1,
      // 省略号之前显示的页数
      groupCount: 5,
      // 每次开始的页数
      startPage: 1,

      selectValue: '',
      // 总的页数
      totalpage: '',
      // prev
      prevEll: false,
      // next
      nextEll: false,
      totalSize: this.props.totalSize
    }
  }

  componentDidMount = () => {
    const { pageNumber, pageSize } = this.props
    const { pageIndex, totalSize } = this.state
    if (totalSize) {
      this.setState(
        {
          totalpage: Math.ceil(totalSize / pageSize),
          selectValue: pageSize
        },
        () => {
          if (pageNumber) {
            this.setState(
              {
                pageIndex: pageNumber
              },
              () => {
                const { pageIndex } = this.state
                this.clickItem(pageIndex, 'first')
              }
            )
          }
        }
      )
    }
  }

  clickItem = (pageIndex, value, reset = false) => {
    const { groupCount, totalpage, selectValue, endPage } = this.state
    const { totalSize } = this.props

    // 只在一个页面显示
    if (totalpage < 9) {
      // 省略号在前
      if (pageIndex < 5) {
        this.setState({
          startPage: 2
        })
      } else {
        // 省略号在后
        this.setState({
          startPage: 3
        })
      }
    }

    if (totalpage >= 9) {
      if (pageIndex < 5) {
        // 开始
        this.setState({
          startPage: 2
        })
      } else if (totalpage - pageIndex >= 4) {
        // 中间
        this.setState({
          startPage: pageIndex - 2
        })
      } else {
        // 最后的部分
        this.setState({
          startPage: totalpage - 5
        })
      }
    }

    // console.log(value)

    if (value === 'first') {
      return
    }

    if (reset === true) {
      this.setState(
        {
          pageIndex: 1,
          startPage: 1
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(
              Number(this.state.pageIndex),
              Number(this.state.selectValue)
            )
          }
        }
      )
    } else {
      this.setState(
        {
          pageIndex
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(
              Number(this.state.pageIndex),
              Number(this.state.selectValue)
            )
          }
        }
      )
    }
  }

  // 上一页
  goPrev = () => {
    const { pageIndex, groupCount, startPage } = this.state
    // 点击了上一页
    let tem = Number(pageIndex) - 1

    // 判断是否到最前
    if (tem <= 0) {
      return
    }

    // 计算startPage的值
    if (!(tem % groupCount)) {
      this.setState({
        startPage: pageIndex - groupCount
      })
    }

    this.setState({
      pageIndex: tem
    })
    this.clickItem(tem)
  }

  // 下一页
  goNext = () => {
    const { pageIndex, groupCount, startPage, totalpage } = this.state
    let tem = Number(pageIndex) + 1
    if (tem > totalpage) {
      return
    }
    if (!(pageIndex % groupCount)) {
      this.setState({
        startPage: tem
      })
    }

    this.setState({
      pageIndex: tem
    })

    this.clickItem(tem)
  }

  create = () => {
    const {
      pageIndex,
      groupCount,
      startPage,
      totalpage,
      prevEll,
      nextEll
    } = this.state
    let pages = []

    // 总显示的页数
    if (totalpage <= 7) {
      pages.push(
        <Button
          type="white"
          className={pageIndex === 1 ? 'no-more-page' : ''}
          key={0}
          onClick={this.goPrev}
        >
          上一页
        </Button>
      )
      for (let i = 1; i <= totalpage; i++) {
        pages.push(
          <Button
            type={i === pageIndex ? 'primary' : 'white'}
            key={i}
            onClick={() => this.clickItem(i)}
          >
            {i}
          </Button>
        )
      }
      pages.push(
        <Button
          type="white"
          className={pageIndex === totalpage ? 'no-more-page' : ''}
          key={totalpage + 1}
          onClick={this.goNext}
        >
          下一页
        </Button>
      )
    } else {
      pages.push(
        <Button
          type="white"
          className={pageIndex === 1 ? 'no-more-page' : ''}
          key={0}
          onClick={this.goPrev}
        >
          上一页
        </Button>
      )

      pages.push(
        <Button
          type={1 === pageIndex ? 'primary' : 'white'}
          key={1}
          onClick={() => this.clickItem(1)}
        >
          {1}
        </Button>
      )

      if (startPage != 2) {
        pages.push(
          <Button type="white" className="ellipsis">
            ...
          </Button>
        )
      }

      for (let i = startPage; i < startPage + groupCount; i++) {
        // 结果页始终是存在的
        if (i <= totalpage - 1) {
          pages.push(
            <Button
              type={i === pageIndex ? 'primary' : 'white'}
              key={i}
              onClick={() => this.clickItem(i)}
            >
              {i}
            </Button>
          )
        }
      }

      // 分页中间的省略号
      if (totalpage - startPage > 5) {
        pages.push(
          <Button type="white" className="ellipsis">
            ...
          </Button>
        )
      }

      // 最后显示的位置
      pages.push(
        <Button
          type={totalpage === pageIndex ? 'primary' : 'white'}
          key={totalpage}
          onClick={() => this.clickItem(totalpage)}
        >
          {totalpage}
        </Button>
      )

      // 显示下一页
      pages.push(
        <Button
          type="white"
          className={pageIndex === totalpage ? 'no-more-page' : ''}
          key={totalpage + 1}
          onClick={this.goNext}
        >
          下一页
        </Button>
      )
    }
    return pages
  }

  handleSelect = (value, value1, value2) => {
    const { totalSize } = this.state
    this.setState(
      {
        selectValue: value
      },
      () => {
        if (totalSize && this.state.selectValue) {
          this.setState(
            {
              totalpage: Math.ceil(totalSize / this.state.selectValue),
              pageIndex: value1 === 'totalChage' ? this.state.pageIndex : 1
            },
            () => {
              this.clickItem(this.state.pageIndex, 'first')
              if (value2 === 'selectChange') {
                if (this.props.onShowSizeChange) {
                  this.props.onShowSizeChange(Number(this.state.selectValue))
                }
              }
            }
          )
        }
      }
    )
  }

  totalSize = () => {
    if (this.state.totalSize !== this.props.totalSize) {
      this.setState(
        {
          totalSize: this.props.totalSize
        },
        () => {
          this.handleSelect(
            this.state.selectValue || this.props.pageSize,
            'totalChage',
            ''
          )
        }
      )
    }
  }

 

  componentDidUpdate(value1, value2) {
    if (value1.pageNumber !== value2.pageIndex) {
      this.setState({
        pageIndex: this.props.pageNumber
      })
    }
  }

  render() {
    const { selectionOptions, totalSize } = this.props
    const { selectValue } = this.state
    this.totalSize()
    //获取具体的某一页
    let setPages = this.create()
    if (totalSize) {
      return (
        <div className="pft-pagination-main">
          <ul className="pft-pagination-page">{setPages}</ul>
          {selectionOptions.length > 0 && (
            <div className="pft-pagination-seleWrap">
              <div className="pft-pagination-per">每页</div>
              <div className="pft-pagination-select">
                <Select
                  defaultValue="10"
                  value={selectValue}
                  onSelect={value =>
                    this.handleSelect(value, '', 'selectChange')
                  }
                >
                  {selectionOptions.map((item, index) => {
                    return <Select.Option value={item} text={item} />
                  })}
                </Select>
              </div>
              <div className="pft-pagination-per">条</div>
            </div>
          )}
        </div>
      )
    }

    return <div />
  }
}

export default Pagination

Pagination.propTypes = {
  totalpage: PropTypes.number,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  selectionOptions: PropTypes.array
}

Pagination.defaultProps = {
  totalpage: '',
  pageNumber: 1,
  pageSize: 10,
  // select 选择框的选项值
  selectionOptions: []
}
