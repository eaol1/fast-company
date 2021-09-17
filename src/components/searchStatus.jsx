import React from "react"
import PropTypes from "prop-types"

const SearchStatus = ({ users, renderPhrase }) => {
  const count = users.length
  return (
    <span className={`badge p-3 mb-2 bg-${count === 0 ? "danger" : "primary"}`}>
      {renderPhrase(count)} с тобой сегодня
    </span>
  )
}

SearchStatus.propTypes = {
  users: PropTypes.array.isRequired,
  renderPhrase: PropTypes.func.isRequired
}

export default SearchStatus
