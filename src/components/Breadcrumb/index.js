import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Breadcrumb extends Component {
  render() {
    const { data } = this.props
    const breadItems = data.map((item, index) => (
      <li className="pft-breadcrumbs-item" key={index}>
        {item.value ? <a href={item.value}>{item.text}</a> : item.text}
        <span className="pft-breadcrumbs-split" />
      </li>
    ))

    return <ul className="pft-breadcrumbs">{breadItems}</ul>
  }
}

Breadcrumb.propTypes = {
  data: PropTypes.array
}

export default Breadcrumb
