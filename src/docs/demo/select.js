import React, { Component } from 'react'
import { Select, WhiteSpace } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      selectValue1: '',
      selectValue2: ['1', '3'],
      // tree
      sourceData: [
        {
          EID: '213000015607873907',
          OrganName: '上海分公司',
          ParentID: '0',
          ChildrenOrgan: [
            {
              EID: '213000016650833660',
              OrganName: '上海营销一组',
              ParentID: '213000015607873907',
              ChildrenOrgan: [
                {
                  EID: '213000018061175923',
                  OrganName: '上海营销二组',
                  ParentID: '213000016650833660',
                  ChildrenOrgan: [
                    {
                      EID: '213000018061205264',
                      OrganName: '上海营销二组-A部门-业务部',
                      ParentID: '213000018061175923',
                      ChildrenOrgan: []
                    },
                    {
                      EID: '213000018061215859',
                      OrganName: '上海营销二组-A部门-产品部',
                      ParentID: '213000018061175923',
                      ChildrenOrgan: []
                    }
                  ]
                },
                {
                  EID: '213000016650833661',
                  OrganName: '上海营销一组-A部门',
                  ParentID: '213000016650833660',
                  ChildrenOrgan: [
                    {
                      EID: '213000017222855670',
                      OrganName: '上海营销一组-A部门-业务部',
                      ParentID: '213000016650833661',
                      ChildrenOrgan: []
                    },
                    {
                      EID: '213000016650833662',
                      OrganName: '上海营销一组-A部门-技术部后端',
                      ParentID: '213000016650833661',
                      ChildrenOrgan: []
                    },
                    {
                      EID: '213000016650833663',
                      OrganName: '上海营销一组-A部门-产品部',
                      ParentID: '213000016650833661',
                      ChildrenOrgan: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        },
        {
          EID: '213000015607873908',
          OrganName: '北京分公司',
          ParentID: '0',
          ChildrenOrgan: []
        }
      ],
      // table
      tableData: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        tableData: [
          {
            ids: '1',
            name: '乔芳',
            mobile: '19420441735'
          },
          {
            ids: '2',
            name: '孔秀兰',
            mobile: '18420441735'
          },
          {
            ids: '3',
            name: '梁涛',
            mobile: '17420441735'
          },
          {
            ids: '4',
            name: '范伟',
            mobile: '16420441735'
          }
        ]
      })
    }, 500)
  }

  handleSelect = value => {
    console.log(value, 'value')
    this.setState(
      {
        selectValue: value
      },
      () => {
        console.log(value)
      }
    )
  }

  handleSelect1 = value => {
    this.setState(
      {
        selectValue1: value
      },
      () => {
        console.log(value)
      }
    )
  }

  handleSelect2 = value => {
    this.setState(
      {
        selectValue2: value
      },
      () => {
        console.log(value)
      }
    )
  }

  render() {
    const {
      selectValue,
      selectValue1,
      selectValue2,
      sourceData,
      tableData
    } = this.state

    const columns = [
      {
        title: '姓名',
        key: 'name',
        width: '65px'
      },
      {
        title: '手机号',
        key: 'mobile',
        width: '120px'
      }
    ]

    return (
      <MainContent>
        <h1 className="api-title">>> 下拉选择</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div style={{ width: '200px' }}>
          <Select
            defaultValue={0}
            value={selectValue}
            onChange={this.handleSelect}
          >
            <Select.Option value={0} text="全部" />
            <Select.Option
              value="car"
              text="汽车汽车汽车汽车汽车汽车汽车汽车汽车汽车汽车"
            />
            <Select.Option value="ship" text="轮船" />
            <Select.Option value="plane" text="飞机" />
          </Select>
        </div>
        <div style={{ paddingTop: '20px' }}>
          当前选择的值为: {JSON.stringify(selectValue)}
        </div>
        <WhiteSpace />
        <div style={{ width: '500px' }}>
          <Select
            mode="tree"
            placeholder="请选择公司类型"
            transformKeys={{
              text: 'OrganName',
              value: 'EID',
              children: 'ChildrenOrgan'
            }}
            sourceData={sourceData}
            value={selectValue1}
            onChange={this.handleSelect1}
          />
          <div style={{ paddingTop: '20px' }}>
            当前选择的值为: {JSON.stringify(selectValue1)}
          </div>
        </div>
        <WhiteSpace />
        <div style={{ width: '150px' }}>
          <Select
            placeholder="请选择负责人"
            mode="table"
            value={selectValue2}
            sourceData={tableData}
            columns={columns}
            onlyId="ids"
            transformKeys={{
              text: 'name',
              value: 'ids'
            }}
            formatOrder={value => value.map(item => item.ids)}
            onChange={this.handleSelect2}
          />
        </div>
      </MainContent>
    )
  }
}
