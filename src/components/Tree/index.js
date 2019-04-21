import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { Icon } from '../index'
import { addClass, removeClass, hasClass, closest } from '../utils/index'

function noop() {}

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceData: props.data,
      currentNode: null,
      expandkeys: []
    }
  }

  formatText(text, key) {
    return text.replace(new RegExp(key), `<em>${key}</em>`)
  }

  getNodes(data, isRoot, deep) {
    const { currentNode } = this.state
    const { searchKey, transformKeys, expandAll } = this.props

    return (
      <ul className="pft-tree-group">
        {data.map((item, index) => {
          const sectionClass = Classnames('pft-tree-section', {
            [`pft-tree-root`]: isRoot,
            [`pft-tree-node-isleaf`]:
              !item[transformKeys.children] ||
              item[transformKeys.children].length < 1
          })

          const sectionItemClass = Classnames('pft-tree-section-item', {
            [`node-expandkey_${
              item[transformKeys.value]
            }-${deep}-${index}`]: true,
            [`pft-tree-node-expand`]: expandAll,
            [`pft-tree-node-active`]:
              currentNode &&
              item[transformKeys.value] === currentNode[transformKeys.value]
          })

          const nodeElement = Classnames('pft-tree-node_element')

          const styles = isRoot
            ? {
                display: 'block'
              }
            : {}

          return (
            <li className={sectionClass} key={index} style={styles}>
              <div className={sectionItemClass}>
                <div
                  className="pft-tree-node-icon"
                  onClick={e => {
                    this.handleClickSection(e)
                  }}
                >
                  <Icon name="tiaozhuan" className="pft-tree-node-arrow" />
                </div>
                <div
                  className={nodeElement}
                  onClick={() => {
                    this.handleNodeSelect(item)
                  }}
                >
                  <span
                    className="pft-tree-search-key"
                    dangerouslySetInnerHTML={{
                      __html: this.formatText(
                        item[transformKeys.text],
                        searchKey
                      )
                    }}
                  />
                </div>
              </div>
              {item[transformKeys.children] &&
                item[transformKeys.children].length > 0 &&
                this.getNodes(item[transformKeys.children], false, deep + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  handleNodeSelect(item) {
    this.setState(
      {
        currentNode: item
      },
      () => {
        this.props.onNodeSelect(item)
      }
    )
  }

  handleClickSection = evt => {
    const sectionItem = closest(evt.target, '.pft-tree-section-item')

    if (hasClass(sectionItem, 'pft-tree-node-expand')) {
      removeClass(sectionItem, 'pft-tree-node-expand')
      return
    }
    addClass(sectionItem, 'pft-tree-node-expand')
  }

  render() {
    const { sourceData } = this.state
    return (
      <div className="pft-tree" ref={ref => (this.tree = ref)}>
        {this.getNodes(sourceData, true, 0)}
      </div>
    )
  }
}

Tree.propTypes = {
  data: PropTypes.array,
  transformKeys: PropTypes.object,
  searchKey: PropTypes.string,
  expandAll: PropTypes.bool,
  onNodeSelect: PropTypes.func
}

Tree.defaultProps = {
  expandAll: false,
  transformKeys: {
    text: 'text',
    value: 'value',
    children: 'children'
  },
  searchKey: '',
  onNodeSelect: noop
}

export default Tree
