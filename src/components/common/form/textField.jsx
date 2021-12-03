import React, { useState } from "react"
import PropTypes from "prop-types"

function TextField({ label, placeholder, type, name, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return `form-control${error ? " is-invalid" : ""}`
  }
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="mb-4">
      {label &&
      <label htmlFor={name}>{label}</label>
      }
      <div className="input-group">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder ? `${placeholder}` : ""}
          className={getInputClasses()}
        />
        {type === "password" &&
          <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}><i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i></button>
        }
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: "text"
}

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField