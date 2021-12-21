import React from "react"
import PropTypes from "prop-types"

function TextAreaField({ label, placeholder, name, value, onChange, error }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return `form-control${error ? " is-invalid" : ""}`
  }

  return (
    <div className="mb-4">
      {label &&
      <label htmlFor={name}>{label}</label>
      }
      <textarea
        className={getInputClasses()}
        id={name}
        name={name}
        rows="3"
        onChange={handleChange}
      >{value}</textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaField.defaultProps = {
  type: "text"
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextAreaField
