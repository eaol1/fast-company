import React, {
  useState,
  useEffect
} from "react"

import _ from "lodash"

import { useParams } from "react-router-dom"

import api from "../../../api"
import GroupList from "../../common/groupList"
import Pagination from "../../common/pagination"
import SearchStatus from "../../ui/searchStatus"
import User from "../userPage/userPage"
import UserTable from "../../ui/usersTable"
import { paginate } from "../../../utils/paginate"
import TextField from "../../common/form/textField"

const usersListPage = () => {
  const params = useParams()
  const { userId } = params
  const pageSize = 8

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchQuery, setSearchQuery] = useState("")

  const [users, setUsers] = useState()
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

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

  const renderPhrase = (number) => {
    const phrase =
      number > 1 && number < 5 ? "а тусанут" : number > 0 ? " тусанет" : ""
    return number === 0
      ? "Никто не тусанет"
      : number + " человек" + phrase
  }

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("")
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(user => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
      : selectedProf
        ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
      setCurrentPage(1)
    }

    const handleSearch = ({ target }) => {
      setSelectedProf(undefined)
      setSearchQuery(target.value)
    }

    return (
      <>
        {userId
          ? (
            <div className="m-3">
              <User id={userId} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
            </div>
          )
          : (
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

              {// count > 0 && (
                <div className="d-flex flex-column">
                  {count > 0 &&
                    <SearchStatus length={count} renderPhrase={renderPhrase} />
                  }
                  <TextField
                    label=""
                    placeholder="Поиск"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  {count > 0
                    ? (<UserTable
                      users={usersCrop}
                      onSort={handleSort}
                      selectedSort={sortBy}
                      onDelete={handleDelete}
                      onToggleBookMark={handleToggleBookMark}
                    />)
                    : (<p>Никто не найден</p>)
                  }
                  <div className="d-flex justify-content-center">
                    <Pagination
                      itemsCount={count}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              // )
              }
            </div>
          )
        }
      </>
    )
  }
  return "loading..."
}

export default usersListPage
