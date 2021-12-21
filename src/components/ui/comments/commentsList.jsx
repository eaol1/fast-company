import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import Comment from "./comment"

const Commentslist = ({ user }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    api.comments.fetchCommentsForUser(user._id).then((data) => setComments(data))
  }, [])
  const commentsCount = comments.length
  return (
    <>
      {commentsCount > 0
        ? (<>
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
        : (<p></p>)
      }
    </>
  )
}

Commentslist.propTypes = {
  user: PropTypes.object
}

export default Commentslist
