import React, {
  useEffect,
  useState
} from "react"

import PropTypes from "prop-types"
import api from "../../../api"
import Qualities from "../../ui/qualities"
import UserInfoCard from "../../ui/userInfoCard"
import MeetingsCard from "../../ui/meetingsCard"
import Commentslist from "../../ui/comments/commentsList"
import CommentForm from "../../ui/commentForm"
const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  // const getSex = () => {
  //   const array = [
  //     { name: "Male", value: "male" },
  //     { name: "Female", value: "female" },
  //     { name: "Other", value: "other" }
  //   ]
  //   let sex = {}
  //   sex = array.filter(s => s.value === user.sex)[0]

  //   return sex.name
  // }

  return <>{user
    ? (
      <>
        <div className="col-md-4 mb-3">
          <UserInfoCard user={user} />
          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Qualities</span>
              </h5>
              <p className="card-text">
                <Qualities qualities={user.qualities} />
              </p>
            </div>
          </div>
          <MeetingsCard meetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <div className="card mb-2">
            <div className="card-body">
              <CommentForm />
            </div>
          </div>
          <Commentslist user={user} />
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
