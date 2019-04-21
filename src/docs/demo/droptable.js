import React, { Component } from 'react'
import { Droptable } from '../../components/index'
import MainContent from '../index'

export default class DroptableDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      // sourceData: [],
      // columns: [],
      value: ''
    }
  }

  handleSelect = value => {
    this.setState({
      selectValue: value
    })
  }

  onChange = value => {
    if (value) {
      this.setState({
        value: value
        // sourceData: [
        //   {
        //     id: 1,
        //     company: '深圳正大九鼎发展有限公司',
        //     prograss: '联系中'
        //   },
        //   {
        //     id: 2,
        //     company: '联想控股股份有限公司',
        //     prograss: '联系中'
        //   },
        //   {
        //     id: 3,
        //     company: '双子资本管理(湖南)有限公司',
        //     prograss: '联系中'
        //   }
        // ],
        // columns: [
        //   {
        //     title: '序号',
        //     key: 'id',
        //     width: '10%'
        //   },
        //   {
        //     title: '机构名称',
        //     key: 'company'
        //   },
        //   {
        //     title: '开发进度',
        //     key: 'prograss',
        //     width: '20%'
        //   }
        // ]
      })
    }
  }
  render() {
    const { selectValue, value } = this.state
    const sourceData = [
      {
        id: 1,
        company: '深圳正大九鼎发展有限公司',
        prograss: '联系中'
      },
      {
        id: 2,
        company: '联想控股股份有限公司',
        prograss: '联系中'
      },
      {
        id: 3,
        company: '双子资本管理(湖南)有限公司',
        prograss: '联系中'
      }
    ]

    const columns = [
      {
        title: '序号',
        key: 'id',
        width: '10%'
      },
      {
        title: '机构名称',
        key: 'company'
      },
      {
        title: '开发进度',
        key: 'prograss',
        width: '20%'
      }
    ]


    return (
      <MainContent>
        <h1 className="api-title">>> 下拉表格</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div>
          <Droptable
            onChange={this.onChange}
            sourceData={sourceData}
            columns={columns}
            value={value}
          />
        </div>
      </MainContent>
    )
  }
}
