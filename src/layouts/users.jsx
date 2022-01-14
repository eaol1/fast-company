import React from "react"
import { useParams } from "react-router-dom"
// import UserPage from "../components/page/userPage"
import User from "../layouts/user"
import UsersListPage from "../components/page/usersListPage"

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <>{userId ? <User userId={userId} /> : <UsersListPage />}</>
}

export default Users
