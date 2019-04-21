import React, { Component } from 'react'
import { Table, Dropdown } from '../../components/index'
import MainContent from '../index'
import './table.less'

const sourceData = [
  {
    id: 1,
    company: '深圳正大九鼎发展有限公司',
    prograss: '联系中1',
    server: '消费业'
  },
  {
    id: 22,
    company: '联想控股股份有限公司',
    prograss: '联系中2',
    server: '互联网业'
  },
  {
    id: 3,
    company: '双本管有限公司',
    prograss: '联系中3',
    server: '制造业'
  },
  {
    id: 4,
    company: '双本管有限公司',
    prograss: '联系中4',
    server: '互联网业'
  },
  {
    id: 5,
    company: '双本管有限公司',
    prograss: '联系中5',
    server: '制造业'
  },
  {
    id: 6,
    company: '双本管有限公司',
    prograss: '联系中6',
    server: '制造业'
  },
  {
    id: 7,
    company: '双本管有限公司',
    prograss: '联系中7',
    server: '消费业'
  },
  {
    id: 8,
    company: '双本管有限公司',
    prograss: '联系中8',
    server: '制造业'
  },
  {
    id: 9,
    company: '双本管有限公司',
    prograss: '联系中9',
    server: '服务业'
  },
  {
    id: 10,
    company: '双本管有限公司',
    prograss: '联系中10',
    server: '制造业'
  },
  {
    id: 11,
    company: '双本管有限公司',
    prograss: '联系中11',
    server: '服务业'
  }
]

const pageSize = 3

export default class TableDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1,
      tableData: this.getCurrData(1, pageSize, sourceData)
    }
  }

  getCurrData(pageNumber, pageSize, data) {
    return data.filter((item, index) => {
      return (
        index >= (pageNumber - 1) * pageSize &&
        index <= pageNumber * pageSize - 1
      )
    })
  }

  handlePageChange = pageNumber => {
    this.setState(
      {
        pageNumber
      },
      () => {
        this.setState({
          tableData: this.getCurrData(
            this.state.pageNumber,
            pageSize,
            sourceData
          )
        })
      }
    )
  }

  handleSelect = val => {
    console.log(val, 'vlu')
  }

  onPageSizeChange = value => {
    console.log(value, 'value')
  }

  render() {
    const { pageNumber, tableData } = this.state

    const columns = [
      {
        title: '序号',
        key: 'autoID',
        width: '100px',
        sortable: true,
        fixed: true
      },
      {
        title: '操作',
        width: '200px',
        render: (text, record) => {
          return (
            <Dropdown
              title="操作"
              value="操作"
              arrowColor="#dc7f58"
              onSelect={this.handleSelect}
            >
              <Dropdown.Item value="1" text="编辑" />
              <Dropdown.Item value="2" text="删除" />
            </Dropdown>
          )
        }
      },
      {
        title: '开发进度',
        key: 'prograss',
        width: '200px'
      },
      {
        title: '机构名称',
        key: 'company',
        render: text => {
          return <a href="http://www.baidu.com">{text}</a>
        },
        filters: [
          {
            text: '深圳正大九鼎发展有限公司',
            value: '深圳正大九鼎发展有限公司'
          },
          {
            text: '联想控股股份有限公司',
            value: '联想控股股份有限公司'
          },
          {
            text: '双本管有限公司',
            value: '双本管有限公司'
          }
        ]
      },
      {
        title: '所属行业',
        key: 'server',
        width: '100px'
      }
    ]

    const pagination = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      totalSize: sourceData.length,
      selectionOptions: [10, 20, 30, 40]
    }

    return (
      <MainContent>
        <h1 className="api-title">>> 表格</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.onPageSizeChange}
          // onRowClick={item => {
          //   console.log(item, 'item')
          // }}
          onCheckChange={list => {
            console.log('list', list)
          }}
          scroll={{ x: 1500 }}
        />
        <br />
        <br />
        <Table dataSource={[]} columns={columns} />
      </MainContent>
    )
  }
}
