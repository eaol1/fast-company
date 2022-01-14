import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import UserInfoCard from "../../ui/userInfoCard";
import MeetingsCard from "../../ui/meetingsCard";
import { orderBy } from "lodash";

import CommentForm from "../../ui/commentForm";
import Comment from "../../ui/comments/comment";
const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    console.log(users);

    const handleDelete = (id) => {
        api.comments.remove(id).then((data1) => {
            setComments(data1);
        });
    }

    const handleSubmit = (data) => {
        api.comments
            .add({ pageId: userId, ...data })
            .then(
                setComments((prevState) => [
                    ...prevState,
                    { pageId: userId, ...data },
                ])
            );
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            {user ? (
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
                                    onSubmit={handleSubmit}
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
                                            {sortedComments.map((comment) => (
                                                <Comment
                                                    key={comment._id}
                                                    comment={comment}
                                                    onDelete={handleDelete}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                </>
            ) : (
                <p>loading...</p>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserPage;
