import React from "react"
import UserPage from "../components/page/userPage/userPage"
import PropTypes from "prop-types"

const User = ({ userId }) => {
  return (
    <div className="container">
      <div className="row gutters-sm">
        <UserPage userId={userId} />
      </div>
    </div>
  )
}

User.propTypes = {
  userId: PropTypes.string
}

export default User
