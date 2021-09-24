import React from "react"

import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Bookmark from "./bookmark"
import QualitiesList from "./qualitiesList"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"

const UserTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
  const columns = {
    name: {
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>,
      path: "name",
      name: "Имя"
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: {
      path: "profession.name",
      name: "Профессия"
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", icon: " bi-caret-up-fill", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => <Bookmark user={user} {...rest} />
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      )
    }
  }

  return (users
    ? (
      <table className="table">
        <TableHeader {...{ onSort, selectedSort, columns }} />
        <TableBody {...{ columns, data: users }} />
      </table>
    )
    : (
      <p>Loading...</p>
    )
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UserTable
