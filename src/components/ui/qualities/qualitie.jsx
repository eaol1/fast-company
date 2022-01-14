import React from "react"
import PropTypes from "prop-types"

const Qualitie = ({ quality }) => {
  return (
    <span key={quality._id} className={`badge bg-${quality.color} me-2`}>
      {quality.name}
    </span>
  )
}

Qualitie.propTypes = {
  quality: PropTypes.object.isRequired
}

export default Qualitie
