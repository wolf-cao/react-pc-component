import React, { Component } from 'react'

class DropMenusComplete extends Component {
  render() {
    const { listWidth, dataSource, visible, onSelect } = this.props

    return (
      <div
        style={{
          display: `${visible && dataSource.length ? 'block' : 'none'}`
        }}
      >
        <ul
          className="pft-autocomplete-list"
          style={{
            minWidth: `${listWidth}px`
          }}
        >
          {dataSource.map(item => (
            <li
              onClick={() => {
                onSelect(item)
              }}
            >
              {item.text || item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DropMenusComplete
