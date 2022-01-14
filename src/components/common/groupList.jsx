import React from "react"

import PropTypes from "prop-types"

const GroupList = ({
  items,
  selectedItem,
  valueProperty,
  contentProperty,
  onProfessionSelect
}) => {
  const professionsArray = !Array.isArray(items) && typeof (items) === "object"
    ? Object.keys(items).map(itemName => ({
      name: items[itemName].name,
      _id: items[itemName]._id
    }))
    : items

  const count = professionsArray.length
  professionsArray.map(item => console.log(item))
  return (
    <ul className="list-group">
      {count > 0 &&
        professionsArray.map(item => (
          <li
            key={item._id}
            className={`list-group-item${item === selectedItem ? " active" : ""}`}
            onClick={() => onProfessionSelect(item)}
            role="button"
          >
            {item.name}
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
