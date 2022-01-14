import React from "react"

import PropTypes from "prop-types"
import Select from "react-select"

const MultiSelectField = ({ options, qualitiesValue, onChange, name, error }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
        ...options[optionName],
        label: options[optionName].name,
        value: options[optionName]._id
      }))
      : options

  const handleChange = (value) => {
    onChange({ label: name, value: value })
  }

  return (
    <div className="mb-4">
      <Select
        isMulti
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        defaultValue={qualitiesValue}
        closeMenuOnSelect={false}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  qualitiesValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string
}

export default MultiSelectField
