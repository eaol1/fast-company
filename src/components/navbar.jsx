import React from "react"

import {
  Link,
  useLocation
} from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  console.log("location", location)
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} aria-current="page" to="/">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link${location.pathname === "/login" ? " active" : ""}`} to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link${location.pathname === "/users/:userId?" ? " active" : ""}`} to="/users">
          Users
        </Link>
      </li>
    </ul>
  )
}

export default Navbar
