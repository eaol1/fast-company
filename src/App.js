import React, {
  useEffect,
  useState
} from "react"

import {
  Route,
  Switch
} from "react-router-dom"

import api from "./api"
import Navbar from "./components/navbar"
import Login from "./layouts/login"
import Main from "./layouts/main"
import Users from "./layouts/users"

const App = () => {
  const [users, setUsers] = useState()
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
    api.professions.fetchAll().then((data) => setProfessions(data))
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
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/users/:userId?" render={() => (users && professions && (
            <Users
              users={users}
              professions={professions}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          ))}/>
        </Switch>
      </div>
    </>
  )
}

export default App
