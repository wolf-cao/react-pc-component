import React, { Component } from 'react'
import { Searchbox, Tab, WhiteSpace, Button } from '../../components/index'
import MainContent from '../index'
import moment from 'moment'

export default class SearchboxDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValue1: {},
      formValue2: {
        creattime: 1,
        branchcompany: 1
      },
      dataSource: [],
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
        }
      ]
    }
  }

  handleSearch = value => {
    console.log(value, 'value')
  }

  handleSearchErr = error => {
    console.log(error, 'err')
  }

  render() {
    const { formValue1, formValue2, dataSource, sourceData } = this.state
    const configs1 = [
      {
        name: 'userId',
        type: 'hidden',
        defaultValue: '000001'
      },
      {
        label: '机构名称',
        name: 'company',
        type: 'autoComplete',
        placeholder: '请输入...',
        explain: '仅支持pdf文件，需加盖公章',
        required: true,
        defaultValue: '123',
        rules: [
          { required: true, message: '机构名称不能为空' },
          {
            max: 6,
            message: '机构名称不能大于6个字'
          }
        ],
        onChange: value => {
          console.log(value, 'value')
          this.setState({
            dataSource: !value
              ? []
              : [value, value + value, value + value + value]
          })
        }
      },
      {
        label: '公司名称',
        type: 'text',
        value: '西虹市证券'
      },
      {
        label: '创建人',
        name: 'creator',
        defaultValue: '1234',
        type: 'input',
        explain: '仅支持pdf文件，需加盖公章',
        required: true,
        rules: [{ required: true, message: '创建人不能为空' }]
      },
      {
        label: '尽调状态',
        name: 'status',
        type: 'select',
        explain: '仅支持pdf文件，需加盖公章',
        defaultValue: 1,
        required: true,
        rules: [{ required: true, message: '请选择尽调状态' }],
        value: [
          {
            text: '尽调中',
            value: 1
          },
          {
            text: '了解客户情况',
            value: 2
          },
          {
            text: '首次拜访客户送资料',
            value: 3
          }
        ]
      },
      {
        label: '只看审核未通过',
        checkLabel: '我要看看',
        name: 'pass',
        type: 'checkbox',
        defaultValue: false
      },
      {
        label: '是否可以',
        name: 'accept',
        type: 'radio',
        defaultValue: 2,
        value: [
          {
            text: '尽调中',
            value: 1
          },
          {
            text: '了解客户情况',
            value: 2
          },
          {
            text: '首次拜访客户送资料',
            value: 3
          }
        ]
      },
      {
        label: '备注',
        name: 'comment',
        explain: '仅支持pdf文件，需加盖公章',
        type: 'textarea',
        defaultValue: '仅支持pdf文件，需加盖公章'
      },
      ,
      {
        label: '备注信息',
        name: 'desc',
        type: 'richtext',
        // defaultValue: '1234',
        required: true,
        rules: [{ required: true, message: '请选择尽调状态' }]
      }
    ]

    const configs2 = [
      {
        label: '机构名称',
        name: 'compnay',
        type: 'input'
      },
      {
        name: 'creattime',
        type: 'select',
        defaultValue: 1,
        width: '105px',
        value: [
          {
            text: '创建时间',
            value: 1
          },
          {
            text: '修改时间',
            value: 2
          }
        ]
      },
      {
        label: '所属分公司',
        name: 'branchcompany',
        type: 'select',
        defaultValue: 1,
        width: '150px',
        value: [
          {
            text: '北京分公司',
            value: 1
          },
          {
            text: '上海分公司',
            value: 2
          },
          {
            text: '徐州分公司',
            value: 3
          }
        ]
      },
      {
        format: 'YYYY-MM-DD',
        showTime: true,
        name: 'rangeTime',
        type: 'rangepicker',
        width: '200px',
        defaultValue: [moment('2018/10/08'), moment('2018/10/12')],
        showSecond: false
      },
      {
        mode: 'tree',
        placeholder: '请选择公司类型',
        transformKeys: {
          text: 'OrganName',
          value: 'EID',
          children: 'ChildrenOrgan'
        },
        sourceData: sourceData,
        defaultValue: '213000015607873907',
        name: 'companys',
        type: 'select'
      }
    ]

    return (
      <MainContent>
        <h1 className="api-title">>> 组合搜索</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Tab defaultKey={1}>
          <Tab.Item title="horizontal">
            <WhiteSpace size="lg" />
            <Searchbox
              layout="horizontal"
              config={configs1}
              formData={formValue1}
              autoDataSource={dataSource}
              onSubmit={this.handleSearch}
              onError={this.handleSearchErr}
              submitText={'提交'}
            />
          </Tab.Item>
          <Tab.Item title="inline">
            <WhiteSpace size="lg" />
            <Searchbox
              layout="inline"
              config={configs2}
              formData={formValue2}
              onSubmit={this.handleSearch}
              onError={this.handleSearchErr}
            />
          </Tab.Item>
        </Tab>
      </MainContent>
    )
  }
}
