import React from "react"

import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        icon: selectedSort.order === "asc" ? "bi-caret-down-fill" : "bi-caret-up-fill",
        order: selectedSort.order === "asc" ? "desc" : "asc"
      })
    } else {
      onSort({ path: item, icon: "bi-caret-up-fill", order: "asc" })
    }
  }
  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            {...{ role: columns[column].path && "button" }}
          >
            {columns[column].name}
            {selectedSort.path === columns[column].path && <i className={`bi ${selectedSort.icon}`}></i>}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
