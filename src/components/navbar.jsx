import React from "react"

import {
  NavLink,
  useLocation
} from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  console.log("location", location)
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink exact className="nav-link" aria-current="page" to="/">
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
      </li>
    </ul>
  )
}

export default Navbar
