import React, { Component } from 'react'
import Classnames from 'classnames'
import { Icon } from '../index'

class OptionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [props.sourceData],
      menusIndex: [],
      selectedMenus: []
    }

    this.selectMenus = []
  }

  isExistMenu(wrapper, itemNode) {
    const { filterKey } = this.props
    return !!wrapper[wrapper.length - 1].filter(
      item => itemNode[0][filterKey] === item[filterKey]
    ).length
  }

  handleMouseClick = () => {
    this.props.onListSelect(this.selectMenus)
  }

  handleMouseEnter = (data, gIndex, index) => {
    const { transformKeys } = this.props
    const { menus, menusIndex } = this.state
    let tmpMenuIndex = menusIndex
    tmpMenuIndex[gIndex] = `${gIndex}-${index}`
    this.selectMenus[gIndex] = data
    if (tmpMenuIndex.length > 0 && gIndex + 1 < tmpMenuIndex.length) {
      tmpMenuIndex = tmpMenuIndex.slice(0, gIndex + 1)
      this.selectMenus = this.selectMenus.slice(0, gIndex + 1)
    }

    this.setState({
      menusIndex: tmpMenuIndex
    })

    if (gIndex + 1 >= menus.length) {
      if (
        data[transformKeys.children] &&
        data[transformKeys.children].length > 0 &&
        !this.isExistMenu(menus, data[transformKeys.children])
      ) {
        this.setState({
          menus: menus.concat([data[transformKeys.children]])
        })
      }
      return
    }

    this.setState(
      {
        menus: menus.slice(0, gIndex + 1)
      },
      () => {
        if (
          data[transformKeys.children] &&
          data[transformKeys.children].length > 0 &&
          !this.isExistMenu(this.state.menus, data[transformKeys.children])
        ) {
          this.setState({
            menus: this.state.menus.concat([data[transformKeys.children]])
          })
        }
      }
    )
  }

  render() {
    const { transformKeys } = this.props
    const { menus, menusIndex } = this.state

    return menus.map((mItem, mIndex) => {
      return (
        <ul className="pft-select-option-group" key={mIndex}>
          {mItem.map((item, index) => {
            const sectionClass = Classnames('pft-select-section', {
              [`pft-select-section-enter-actived`]:
                menusIndex[mIndex] &&
                (Number(menusIndex[mIndex].split('-')[0]) === mIndex &&
                  Number(menusIndex[mIndex].split('-')[1]) === index)
            })
            return (
              <li
                className={sectionClass}
                key={index}
                onMouseEnter={() => {
                  this.handleMouseEnter(item, mIndex, index)
                }}
                onClick={this.handleMouseClick}
              >
                <span className="pft-select-section-title">
                  {item[transformKeys.text]}
                </span>
                {item[transformKeys.children] &&
                  item[transformKeys.children].length > 0 && (
                    <Icon name="tiaozhuan" color="#dc7f58" />
                  )}
              </li>
            )
          })}
        </ul>
      )
    })
  }
}

OptionList.defaultProps = {
  transformKeys: {
    text: 'text',
    value: 'value',
    children: 'children'
  }
}

export default OptionList
