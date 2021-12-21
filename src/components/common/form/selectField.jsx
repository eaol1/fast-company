import React from "react"
import PropTypes from "prop-types"

const SelectField = ({ label, name, value, onChange, defaultOption, options, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return `form-select${error ? " is-invalid" : ""}`
  }
  const optionsArray = !Array.isArray(options) && typeof (options) === "object"
    ? Object.keys(options).map(optionName => ({
      ...options[optionName],
      name: options[optionName].name

    }))
    : options
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        key={value}
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">{defaultOption}</option>
        {optionsArray && optionsArray.map(option =>
          <option
            value={option._id}
            key={option._id}
          >
            {option.name}
          </option>
        )}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string
}

export default SelectField
