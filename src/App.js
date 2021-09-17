import React, { useState } from "react"

import api from "./api"
import Users from "./components/users"
const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((u) => u._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark
          return user
        }
        return user
      })
    )
  }

  return (
    <div className="container mt-3">
      {!!users.length && (
        <Users
          users={users}
          handleDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  )
}

export default App
