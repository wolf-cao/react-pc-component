import React, { Component } from 'react'
import ClassNames from 'classnames'
import { connect } from 'mini-store'
import { Icon } from '../index'

@connect(state => ({
  activeTrKey: state.activeTrKey,
  sortKey: state.sortKey,
  sortType: state.sortType
}))
class FixedTableCol extends Component {
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

  handleTrOver(index) {
    const { store } = this.props
    store.setState({
      activeTrKey: `${index}`
    })
  }

  handleTrOut(index) {
    const { store } = this.props
    store.setState({
      activeTrKey: `${index}`
    })
  }

  sortTable() {
    const { sortKey, sortType, dataSource } = this.props
    const tmp = JSON.parse(JSON.stringify(dataSource))
    let revert = 0
    if (sortType === 'up') {
      revert = 1
    }
    if (sortType === 'down') {
      revert = -1
    }

    return tmp.sort((a, b) => {
      return (a[sortKey] - b[sortKey]) * revert
    })
  }

  render() {
    const { columns, activeTrKey, sortKey, sortType, pagination } = this.props
    const tableData = this.sortTable()
    const fixedColNames = []

    return (
      <table className="pft-table-body pft-table-fixed-cols">
        <colgroup>
          {columns.map(item => {
            const styles = {
              width: item.width,
              minWidth: item.width
            }
            return <col style={styles} />
          })}
        </colgroup>
        <thead className="pft-table-theader pft-table-fixed-theader">
          {columns.map((item, index) => {
            const headColsCls = ClassNames('pft-table-th-content', {
              [`pft-table-th-operator`]: item.sortable
            })
            const sortableClass = ClassNames('pft-table-sortable', {
              [`pft-table-sort-up`]: item.key === sortKey && sortType === 'up',
              [`pft-table-sort-down`]:
                item.key === sortKey && sortType === 'down'
            })
            if (item.fixed) {
              fixedColNames.push(item)
              return (
                <th key={index}>
                  <div className="pft-table-th-wrapper">
                    <div
                      className={headColsCls}
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
                  </div>
                </th>
              )
            }
            return null
          })}
        </thead>
        <tbody className="pft-table-tbody">
          {tableData.map((item, index) => {
            return (
              <tr
                className={
                  activeTrKey &&
                  Number(activeTrKey) === index &&
                  'pft-table-tr-actived'
                }
                onMouseEnter={() => {
                  this.handleTrOver(index)
                }}
                onMouseLeave={() => {
                  this.handleTrOut(index)
                }}
              >
                {fixedColNames.map((col, cindex) => {
                  if (col.render) {
                    return (
                      <td key={`table-td-${cindex}`}>
                        {col.render(col.key ? item[col.key] : null, item)}
                      </td>
                    )
                  }
                  if (col.key === 'autoID') {
                    const pageNo =
                      pagination.pageNumber * pagination.pageSize -
                      (pagination.pageSize - (index + 1))
                    return <td key={cindex}>{pageNo}</td>
                  }
                  return <td key={cindex}>{item[col.key]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default FixedTableCol
