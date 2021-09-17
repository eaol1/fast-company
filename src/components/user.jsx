import React from "react"
import PropTypes from "prop-types"
import Bookmark from "./bookmark"
import Qualitie from "./qualitie"

const User = ({ user, handleDelete, ...rest }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie quality={quality} key={quality._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <Bookmark user={user} {...rest} />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default User
