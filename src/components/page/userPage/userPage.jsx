import React, {
  useEffect,
  useState
} from "react"

import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom"
import api from "../../../api"
import Qualities from "../../ui/qualities"
const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const history = useHistory()

  const handleBackward = () => {
    history.push("/users")
  }

  return <>{user
    ? (
      <>
        <h2>{user.name}</h2>
        <div>Качества:&nbsp;
          <Qualities qualities={user.qualities} />
        </div>
        <div>Профессия: {user.profession.name}</div>
        <div>Встретился, раз: {user.completedMeetings}</div>
        <div>Оценка: {user.rate}/5</div>
        <div className="mt-4">
          <Link to={`/users/${user._id}/edit`}
            className="btn btn-secondary btn-sm"
            onClick={() => { handleBackward() }}
          >
            Редактировать
          </Link>
        </div>
      </>)
    : (
      <p>loading...</p>
    )
  }
  </>
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
