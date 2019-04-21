import React, { Component } from 'react'
import { Tree, WhiteSpace, Switch, Input } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [
        {
          EID: '2130000156078739071',
          OrganName: '上海分公司',
          ParentID: '0',
          ChildrenOrgan: [
            {
              EID: '2130000166508336601',
              OrganName: '上海营销一组',
              ParentID: '213000015607873907',
              ChildrenOrgan: [
                {
                  EID: '213000016650833661',
                  OrganName: '上海营销一组-A部门',
                  ParentID: '213000016650833660',
                  ChildrenOrgan: [
                    {
                      EID: '213000017222855670',
                      OrganName: '上海营销一组-A部门-业务部',
                      ParentID: '2130000166508336612',
                      ChildrenOrgan: []
                    },
                    {
                      EID: '213000016650833662',
                      OrganName: '上海营销一组-A部门-技术部后端',
                      ParentID: '2130000166508336613',
                      ChildrenOrgan: []
                    },
                    {
                      EID: '213000016650833663',
                      OrganName: '上海营销一组-A部门-产品部',
                      ParentID: '2130000166508336614',
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
      ],
      isExpand: true,
      searchKey: ''
    }
  }

  handleSearch = evt => {
    this.setState({
      searchKey: evt.target.value
    })
  }

  render() {
    const { treeData, isExpand, searchKey } = this.state

    return (
      <MainContent>
        <h1 className="api-title">>> 树形结构</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <div style={{ width: '200px' }}>
          <Input placeholder="搜索关键字" onChange={this.handleSearch} />
        </div>
        <WhiteSpace />
        <Switch
          defaultValue={1}
          values={[
            {
              text: '展开',
              value: 1
            },
            {
              text: '收起',
              value: 2
            }
          ]}
          onSwitch={val => {
            this.setState({
              isExpand: val !== 2
            })
          }}
        />
        <WhiteSpace />
        <Tree
          data={treeData}
          transformKeys={{
            text: 'OrganName',
            value: 'EID',
            children: 'ChildrenOrgan'
          }}
          searchKey={searchKey}
          expandAll={isExpand}
          onNodeSelect={value => {
            console.log(value, 'val')
          }}
        >
          这是一个按钮
        </Tree>
      </MainContent>
    )
  }
}
