import React, {
  useEffect,
  useState
} from "react"

import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

import api from "../api"
import Bookmark from "./bookmark"
import Qualitie from "./qualitie"

const User = ({ id, ...rest }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  }, [])

  const history = useHistory()

  const handleBackward = () => {
    history.push("/users")
  }

  return (
    <>
      {user &&
        <div>
          <h2>{user.name}</h2>
          <div>Качества:&nbsp;
            {user.qualities.map((quality) => (
              <Qualitie quality={quality} key={quality._id} />
            ))}
          </div>
          <div>Профессия: {user.profession.name}</div>
          <div>Встретился, раз: {user.completedMeetings}</div>
          <div>Оценка: {user.rate}/5</div>
          <div>Избранное:
            <Bookmark user={user} {...rest} />
          </div>
          <div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { handleBackward() }}
            >
              Все пользователи
            </button>
          </div>
        </div>
      }
    </>
  )
}

User.propTypes = {
  id: PropTypes.string.isRequired
}

export default User
