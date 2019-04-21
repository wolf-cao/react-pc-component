import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import { create, Provider } from 'mini-store'
import { Pagination } from '../index'
import ThHeader from './thHeader'
import TdRow from './tdRow'
import FixedCols from './fixedCol'

function noop() {}

class Table extends Component {
  constructor(props) {
    super(props)
    this.store = create({
      activeTrKey: '',
      sortKey: '',
      sortType: '',
      filterKey: '',
      filterValue: {},
      checkData: this.initialCheckedData(props.checkedData)
    })
  }

  initialCheckedData(data) {
    if (!data) {
      return {}
    }
    const { dataSource, onlyId } = this.props
    const initCheckData = {}
    data.map(tData => {
      const tmpData = dataSource.filter(item => tData === item[onlyId])
      if (tmpData.length > 0) {
        initCheckData[`data_${tData}`] = {
          data: tmpData[0],
          value: true
        }
      }
    })
    return initCheckData
  }

  render() {
    const {
      preCls,
      onlyId,
      canCheck,
      dataSource,
      columns,
      pagination,
      onPageChange,
      scroll,
      pagiFlow,
      emptyText,
      onRowClick,
      onCheckChange,
      onPageSizeChange
    } = this.props

    const wrapperClass = Classnames(`${preCls}-wrapper`, {
      [`${preCls}-is-fix`]: columns.filter(item => item.fixed).length > 0
    })

    return (
      <Provider store={this.store}>
        <div className={preCls}>
          <div
            className={wrapperClass}
            onMouseLeave={() => {
              this.store.setState({
                activeTrKey: ''
              })
            }}
          >
            <FixedCols
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
            />
            <div className={`${preCls}-contrainer`}>
              <table
                className={`${preCls}-body`}
                ref={ref => (this.mainTable = ref)}
                style={{ width: `${scroll && scroll.x + 'px'}` }}
              >
                <ThHeader columns={columns} canCheck={canCheck} />
                {dataSource.length > 0 ? (
                  <TdRow
                    onlyId={onlyId}
                    canCheck={canCheck}
                    dataSource={dataSource}
                    columns={columns}
                    onRowClick={onRowClick}
                    onCheckChange={onCheckChange}
                    pagination={pagination}
                  />
                ) : (
                  <tr>
                    <td
                      className={`${preCls}-empty`}
                      colspan={canCheck ? columns.length + 1 : columns.length}
                    >
                      {emptyText}
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>
          {pagination && (
            <div className={`${preCls}-footer`} style={{ textAlign: pagiFlow }}>
              <Pagination
                pageSize={pagination.pageSize}
                pageNumber={pagination.pageNumber}
                totalSize={pagination.totalSize}
                onChange={onPageChange}
                selectionOptions={pagination.selectionOptions}
                onShowSizeChange={onPageSizeChange}
              />
            </div>
          )}
        </div>
      </Provider>
    )
  }
}

Table.propTypes = {
  preCls: PropTypes.string,
  canCheck: PropTypes.bool,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  sroll: PropTypes.bool,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onCheckChange: PropTypes.func,
  pagiFlow: PropTypes.string,
  emptyText: PropTypes.string,
  onPageSizeChange: PropTypes.func
}

Table.defaultProps = {
  preCls: 'pft-table',
  canCheck: false,
  pagiFlow: 'center',
  sroll: false,
  emptyText: '数据为空',
  onPageChange: noop,
  onCheckChange: noop,
  onPageSizeChange: noop
}

export default Table
