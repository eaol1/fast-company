import React, {
  useEffect,
  useState
} from "react"

import PropTypes from "prop-types"

import api from "../api"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import Pagination from "./pagination"
import SearchStatus from "./searchStatus"
import User from "./user"

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 2
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const renderPhrase = (number) => {
    const phrase =
      number > 1 && number < 5 ? "а тусанут" : number > 0 ? " тусанет" : ""
    return number === 0
      ? "Никто не тусанет"
      : number + " человек" + phrase
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? allUsers.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : allUsers

  const count = filteredUsers.length
  const users = paginate(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
    setCurrentPage(1)
  }

  return (
    <div className="container m-3 d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 pe-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onProfessionSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}

      {count > 0 && (
        <div className="d-flex flex-column">
          <SearchStatus length={count} renderPhrase={renderPhrase} />
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
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
