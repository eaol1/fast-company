import React, {
  useEffect,
  useState
} from "react"

import api from "./api"
import Users from "./components/users"

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

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
    <>
      {users && (
        <Users
          users={users}
          handleDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </>
  )
}

export default App
