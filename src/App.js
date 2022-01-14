import React from "react"

import {
  Route,
  Switch
} from "react-router-dom"
import EditForm from "./components/ui/editForm"
import Navbar from "./components/ui/navbar"
import Login from "./layouts/login"
import Main from "./layouts/main"
import Users from "./layouts/users"

const App = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId/edit" render={() => <EditForm />}/>
          <Route path="/users/:userId?" render={() => <Users />}/>
        </Switch>
      </div>
    </>
  )
}

export default App
