import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from '../index'

class SelectTable extends Component {
  render() {
    const {
      sourceData,
      columns,
      checkedData,
      onlyId,
      onCheckChange
    } = this.props

    return (
      <Table
        onlyId={onlyId}
        dataSource={sourceData}
        columns={columns}
        onCheckChange={onCheckChange}
        checkedData={checkedData}
        canCheck
      />
    )
  }
}

export default SelectTable
