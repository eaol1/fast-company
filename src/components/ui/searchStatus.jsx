import React from "react"

import PropTypes from "prop-types"

const SearchStatus = ({ length, renderPhrase }) => {
  return (
    <span className={`badge p-3 mb-4 bg-${length === 0 ? "danger" : "primary"}`}>
      {renderPhrase(length)} с тобой сегодня
    </span>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
  renderPhrase: PropTypes.func.isRequired
}

export default SearchStatus
