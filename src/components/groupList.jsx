import React from "react"

import PropTypes from "prop-types"

const GroupList = ({
  items,
  selectedItem,
  valueProperty,
  contentProperty,
  onProfessionSelect
}) => {
  const count = items.length

  return (
    <ul className="list-group">
      {count > 0 &&
        items.map(item => (
          <li
            key={item[valueProperty]}
            className={`list-group-item${item === selectedItem ? " active" : ""}`}
            onClick={() => onProfessionSelect(item)}
            role="button"
          >
            {item[contentProperty]}
          </li>
        ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onProfessionSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}
export default GroupList
