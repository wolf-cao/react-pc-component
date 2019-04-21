import React, { Component } from 'react'
import { Menu } from '../../components/index'
import MainContent from '../index'

export default class ButtonDemo extends Component {
  render() {
    const menus = [
      {
        text: '首页',
        url: 'http://www.xxxxxx.com/Home/Index'
      },
      {
        text: '阳光私募',
        url: 'http://www.xxxxxx.com/Sunlight/ProductList',
        children: [
          {
            text: '私募产品',
            url: 'http://www.xxxxxx.com/Sunlight/ProductList'
          },
          {
            text: '私募公司',
            url: 'http://www.xxxxxx.com/Sunlight/CompanyList'
          },
          {
            text: '基金经理',
            url: 'http://www.xxxxxx.com/Sunlight/ManagerList'
          }
        ]
      },
      {
        text: '私募股权',
        url: 'http://www.xxxxxx.com/Stock/Product',
        children: [
          {
            text: '产品筛选',
            url: 'http://www.xxxxxx.com/Stock/Product'
          },
          {
            text: '机构筛选',
            url: 'http://www.xxxxxx.com/Stock/Organ'
          }
        ]
      },
      {
        text: '路演直播',
        url: 'http://www.xxxxxx.com/Video/Index'
      },
      {
        text: '新闻资讯',
        url: 'http://www.xxxxxx.com/News/Index',
        children: [
          {
            text: '焦点新闻',
            url: 'http://www.xxxxxx.com/News/Index/0'
          },
          {
            text: '调研动态',
            url: 'http://www.xxxxxx.com/News/Index/1'
          }
        ]
      },
      {
        text: '投研观点',
        url: 'http://www.xxxxxx.com/Report/Index',
        children: [
          {
            text: '私募研报',
            url: 'http://www.xxxxxx.com/Report/Index/0'
          },
          {
            text: '信托研究',
            url: 'http://www.xxxxxx.com/Report/Index/1'
          },
          {
            text: '集合理财',
            url: 'http://www.xxxxxx.com/Report/Index/2'
          },
          {
            text: '基金投资策略',
            url: 'http://www.xxxxxx.com/Report/Index/3'
          }
        ]
      },
      {
        text: '社区',
        url: 'http://www.xxxxxx.com/Circle/Index'
      }
    ]
    return (
      <MainContent>
        <h1 className="api-title">>> 菜单</h1>
        <h1 className="api-title-sub">组件例子:</h1>
        <Menu data={menus} />
      </MainContent>
    )
  }
}
