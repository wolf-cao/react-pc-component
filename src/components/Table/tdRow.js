import React, { Component } from 'react'
import { connect } from 'mini-store'
import { Checkbox } from '../index'

function noop() {}

@connect(state => ({
  activeTrKey: state.activeTrKey,
  sortKey: state.sortKey,
  sortType: state.sortType,
  checkData: state.checkData
}))
class TdRow extends Component {
  handleTrCheck(flag, item) {
    const { store, checkData, onlyId } = this.props
    const tmpCheckData = JSON.parse(JSON.stringify(checkData))
    tmpCheckData[`data_${item[onlyId]}`] = {
      data: item,
      value: flag
    }
    if (!flag) {
      delete tmpCheckData[`data_${item[onlyId]}`]
    }
    store.setState({
      checkData: tmpCheckData
    })

    setTimeout(() => {
      this.props.onCheckChange(
        Object.values(this.props.checkData).map(item => item.data)
      )
    }, 0)
  }

  handleTrOver(index) {
    const { store } = this.props
    store.setState({
      activeTrKey: `${index}`
    })
  }

  handleTrOut = index => {
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
    const {
      columns,
      activeTrKey,
      onRowClick,
      canCheck,
      onlyId,
      checkData,
      pagination
    } = this.props

    const tableData = this.sortTable()

    return (
      <tbody className="pft-table-tbody">
        {tableData.map((item, index) => {
          return (
            <tr
              key={`table-tr-${index}`}
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
              onClick={() => {
                onRowClick(item)
              }}
            >
              {canCheck && (
                <td key={`table-td-checked${Math.floor(Math.random() * 100)}`}>
                  <Checkbox
                    checked={
                      (checkData[`data_${item[onlyId]}`] &&
                        checkData[`data_${item[onlyId]}`].value) ||
                      false
                    }
                    onChange={value => {
                      this.handleTrCheck(value, item)
                    }}
                  />
                </td>
              )}
              {columns.map((col, cindex) => {
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
    )
  }
}

TdRow.defaultProps = {
  onRowClick: noop
}

export default TdRow
