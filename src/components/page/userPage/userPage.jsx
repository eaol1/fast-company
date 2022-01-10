import React, {
  useEffect,
  useState
} from "react"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"
import api from "../../../api"
import Qualities from "../../ui/qualities"
import UserInfoCard from "../../ui/userInfoCard"
import MeetingsCard from "../../ui/meetingsCard"

// import Commentslist from "../../ui/comments/commentsList"
import CommentForm from "../../ui/commentForm"
import Comment from "../../ui/comments/comment"
const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})
  const [comment, setComment] = useState({
    pageId: "",
    userId: "",
    content: "",
    created_at: new Date().getTime()
  })

  useEffect(() => {
    api
      .users
      .fetchAll()
      .then((data) =>
        setUsers(data)
      )
    api
      .users
      .getById(userId)
      .then((data2) =>
        setUser(data2)
      )
    api
      .comments
      .fetchCommentsForUser(userId)
      .then((data3) =>
        setComments(data3)
      )
  }, [])

  /*  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }, [comment]) */

  const handleChange = (target) => {
    setComment(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    user: {
      isRequired: {
        message: "Это поле обязательно для заполнения"
      }
    },
    comment: {
      isRequired: {
        message: "Комментарий обязателен для заполнения"
      }
    }
  }

  useEffect(() => {
    validate()
  }, [comment])

  const validate = () => {
    const errors = validator(comment, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0 || false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    console.log("comment", comment)
    api
      .comments
      .add({
        pageId: `${e.target.userId.value}`,
        userId: `${e.target.userId.value}`,
        content: `${e.target.comment.value}`
      }).then(setComments(prevState => ([...prevState, comment])))
  }

  // const commentsCount = comments.length
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
              <CommentForm
                users={users}
                comment={comment}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errors={errors}
              />
            </div>
          </div>
          <>
            {comments.length > 0 && (
              <>
                <div className="card mb-3">
                  <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map(comment =>
                      <Comment
                        key={comment._id}
                        user={user}
                        comment={comment}
                      />
                    )}
                  </div>
                </div>
              </>)
            }
          </>
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
