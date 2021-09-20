import React, {
  useEffect,
  useState
} from "react"

import _ from "lodash"
import PropTypes from "prop-types"

import api from "../api"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import Pagination from "./pagination"
import SearchStatus from "./searchStatus"
import UserTable from "./usersTable"

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })

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

  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? allUsers.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : allUsers

  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const users = paginate(sortedUsers, currentPage, pageSize)

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
          <UserTable
            users={users}
            onSort={handleSort}
            selectedSort={sortBy}
            {...rest}
          />
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
