import React, { Component } from 'react'
import { connect } from 'mini-store'
import Classnames from 'classnames'
import { Icon } from '../index'
import { renderFilter } from './utils'
import { hasClass } from '../utils/index'

@connect(state => ({
  sortKey: state.sortKey,
  sortType: state.sortType,
  filterKey: state.filterKey,
  filterValue: state.filterValue
}))
class ThHeader extends Component {
  handleFilter(evt, item) {
    const { store } = this.props
    store.setState({
      filterKey: item.key
    })
    let filterElement = evt.target
    if (hasClass(evt.target, 'iconfont')) {
      filterElement = evt.target.parentNode
    }
    renderFilter(
      filterElement.getBoundingClientRect(),
      (this.props.filterKey && this.props.filterValue[this.props.filterKey]) ||
        {},
      item.key,
      item.filters,
      () => {
        // store.setState({
        //   filterKey: ''
        // })
      },
      values => {
        const { filterKey, filterValue } = this.props
        const tmpFilterValues = JSON.parse(JSON.stringify(filterValue))
        tmpFilterValues[filterKey] = values[filterKey]
        store.setState({
          filterValue: tmpFilterValues
        })
      }
    )
  }

  handleSort(key) {
    const { store, sortKey, sortType } = this.props

    if (!sortKey && !sortType) {
      store.setState({
        sortKey: key,
        sortType: 'down'
      })
      return
    }
    if (sortKey === key && sortType === 'down') {
      store.setState({
        sortType: 'up'
      })
      return
    }
    if (sortKey === key && sortType === 'up') {
      store.setState({
        sortKey: '',
        sortType: ''
      })
      return
    }
    if (sortKey !== key) {
      store.setState({
        sortKey: key,
        sortType: 'down'
      })
    }
  }

  render() {
    const { columns, sortKey, sortType, filterKey, canCheck } = this.props

    return (
      <React.Fragment>
        <colgroup>
          {canCheck && <col style={{ width: '50px' }} />}
          {columns.map(item => {
            const styles = {
              width: item.width,
              minWidth: item.width
            }
            return <col style={styles} />
          })}
        </colgroup>
        <thead className="pft-table-theader">
          {canCheck && <th />}
          {columns.map(item => {
            const sortableClass = Classnames('pft-table-sortable', {
              [`pft-table-sort-up`]: item.key === sortKey && sortType === 'up',
              [`pft-table-sort-down`]:
                item.key === sortKey && sortType === 'down'
            })

            const filterClass = Classnames('pft-table-filterable', {
              [`pft-table-filter-active`]: item.key === filterKey
            })

            const operateClass = Classnames('pft-table-th-content', {
              [`pft-table-th-operator`]: item.sortable
            })

            return (
              <th>
                <div className="pft-table-th-wrapper">
                  <div
                    className={operateClass}
                    onClick={() => {
                      item.sortable && this.handleSort(item.key)
                    }}
                  >
                    {item.title}
                    {item.sortable && (
                      <span className={sortableClass}>
                        <Icon
                          name="shangjiantou"
                          className="pft-table-up-icon"
                        />
                        <Icon
                          name="xiajiantou"
                          className="pft-table-down-icon"
                        />
                      </span>
                    )}
                  </div>
                  {item.filters && (
                    <div
                      className={filterClass}
                      onClick={evt => {
                        this.handleFilter(evt, item)
                      }}
                    >
                      <Icon name="filter" />
                    </div>
                  )}
                </div>
              </th>
            )
          })}
        </thead>
      </React.Fragment>
    )
  }
}

export default ThHeader
