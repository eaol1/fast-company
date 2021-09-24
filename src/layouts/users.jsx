import React, {
  useState
} from "react"

import _ from "lodash"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

import GroupList from "../components/groupList"
import Pagination from "../components/pagination"
import SearchStatus from "../components/searchStatus"
import User from "../components/user"
import UserTable from "../components/usersTable"
import { paginate } from "../utils/paginate"

const Users = ({ users: allUsers, professions, ...rest }) => {
  const params = useParams()
  const { userId } = params
  const pageSize = 8

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })

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
    <>
      {userId
        ? (
          <div className="m-3">
            <User id={userId} {...rest} />
          </div>
        )
        : (
          <div className="m-3 d-flex">
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
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  professions: PropTypes.array.isRequired
}

export default Users
