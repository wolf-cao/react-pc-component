import '@babel/polyfill'
import React, { Component } from 'react'
import { Sider } from '../components/index'
import '../components/AutoComplete/style/index'
import '../components/Button/style/index'
import '../components/Breadcrumb/style/index'
import '../components/Checkbox/style/index'
import '../components/Datepicker/style/index'
import '../components/Dialog/style/index'
import '../components/Dropdown/style/index'
import '../components/Form/style/index'
import '../components/Fileup/style/index'
import '../components/Menu/style/index'
import '../components/Message/style/index'
import '../components/Icon/style/index'
import '../components/Input/style/index'
import '../components/ImagePreview/style/index'
import '../components/Panel/style/index'
import '../components/Popover/style/index'
import '../components/Sider/style/index'
import '../components/Select/style/index'
import '../components/Searchbox/style/index'
import '../components/Switch/style/index'
import '../components/Droptable/style/index'
import '../components/Pagination/style/index'
import '../components/Table/style/index'
import '../components/Tab/style/index'
import '../components/Spin/style/index'
import '../components/Tree/style/index'
import '../components/TitleBar/style/index'
import '../components/Badge/style/index'
import '../components/Radio/style/index'
import '../components/Fileup/style/index'
import '../components/Richtext/style/index'
import '../components/WhiteSpace/style/index'

import './index.less'

export default class PageIndex extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header-content">
            <img src="xxxx" alt="xxxx" />
          </div>
        </div>
        <div className="container">
          <div className="sider">
            <Sider width="250">
              <Sider.Group title="基础组件" icon="kefu">
                <Sider.Item
                  title="Breadcrumbs 面包屑"
                  href="/api/breadcrumbs"
                />
                <Sider.Item title="Button 按钮" href="/api/button" />
                <Sider.Item title="Checkbox 复选框" href="/api/checkbox" />
                <Sider.Item title="Datepicker 日历" href="/api/datepicker" />
                <Sider.Item title="Dialog 弹窗" href="/api/dialog" />
                <Sider.Item title="Dropdown 下拉框" href="/api/dropdown" />
                <Sider.Item title="Fileup 上传" href="/api/fileup" />
                <Sider.Item title="Input 输入框" href="/api/input" />
                <Sider.Item
                  title="ImagePreview 图片预览"
                  href="/api/imagepreview"
                />
                <Sider.Item title="Popover 气泡" href="/api/popover" />
                <Sider.Item title="Select 下拉选择" href="/api/select" />
                <Sider.Item title="Tab 标签页" href="/api/tabs" />
                <Sider.Item title="TitleBar 标题栏" href="/api/titlebar" />
                <Sider.Item title="Spin 加载" href="/api/spin" />
                <Sider.Item title="Pagination 分页" href="/api/pagination" />
                <Sider.Item title="Badge 徽标图" href="/api/badge" />
                <Sider.Item title="Radio 单选框" href="/api/radio" />
                <Sider.Item title="Menu 菜单" href="/api/menu" />
                <Sider.Item title="Message 消息" href="/api/message" />
              </Sider.Group>
              <Sider.Group title="组合组件" icon="kefu">
                <Sider.Item
                  title="AutoComplete 自动补全"
                  href="/api/autocomplete"
                />
                <Sider.Item title="Searchbox 组合搜索" href="/api/searchbox" />
                <Sider.Item title="Switch 切换" href="/api/switch" />
                <Sider.Item title="Form 表单列表" href="/api/form" />
                <Sider.Item title="Richtext 富文本" href="/api/richtext" />
                <Sider.Item title="Table 表格" href="/api/table" />
                <Sider.Item title="Tree 树形结构" href="/api/tree" />
              </Sider.Group>
            </Sider>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    )
  }
}
