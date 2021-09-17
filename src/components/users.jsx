import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { paginate } from "../utils/paginate"
import api from "../api"
import SearchStatus from "./searchStatus"
import Pagination from "./pagination"
import User from "./user"
import GroupList from "./groupList"

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll()
      .then(data =>
        setProfessions(data)
      )
  }, [])

  const renderPhrase = (number) => {
    const phrase =
      number > 1 && number < 5 ? "а тусанут" : number > 0 ? " тусанет" : ""
    return number === 0
      ? "Никто не тусанет"
      : users.length + " человек" + phrase
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? allUsers.filter(user => user.profession === selectedProf)
    : allUsers

  const count = filteredUsers.length
  const users = paginate(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="container mt-3">
      <SearchStatus users={users} renderPhrase={renderPhrase} />
      {professions &&
        <>
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onProfessionSelect={handleProfessionSelect}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={clearFilter}
          >Очистить</button>
        </>
      }

      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Проффессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} key={user._id} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
