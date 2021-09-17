import React from "react"
import PropTypes from "prop-types"

const GroupList = ({ items, selectedItem, valueProperty, contentProperty, onProfessionSelect }) => {
  const professions = Object.values(items)
  const count = professions.length

  return (
    <ul className="list-group">
      {count > 0 &&
        professions.map(item =>
          <li
            key={item[valueProperty]}
            className={`list-group-item${(item === selectedItem ? " active" : "")}`}
            onClick={() => onProfessionSelect(item)}
            role="button"
          >
            {item[contentProperty]}
          </li>
        )
      }
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
}

GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onProfessionSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}
export default GroupList
