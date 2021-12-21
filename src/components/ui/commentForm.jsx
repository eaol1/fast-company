import React, { useState, useEffect } from "react"
import api from "../../api"
import { validator } from "../../utils/validator"
import SelectField from "../common/form/selectField"
import TextAreaField from "../common/form/textAreaField"

const CommentForm = () => {
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})
  const [comment, setComment] = useState({
    pageId: "",
    userId: "",
    content: "",
    created_at: new Date().getTime()
  })

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])
  const handleChange = (target) => {
    setUsers(prevState => ({
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
    const date = new Date()
    const object = {
      _id: date.getTime().toString(),
      pageId: `${e.target.users.value}`,
      userId: `${e.target.users.value}`,
      content: e.target.comment.value,
      created_at: date.getTime()
    }
    setComment(object)
    console.log("comment", comment)
    api.comments.add(comment).then()
  }

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        label="Выберите пользователя"
        name="users"
        defaultOption="Выберите..."
        value={comment.userId}
        onChange={handleChange}
        options={users}
        error={errors.users}
      />
      <TextAreaField
        label="Комментарий"
        name="comment"
        value={comment.comment}
        onChange={handleChange}
        error={errors.comment}
      />
      <button className="btn btn-primary w-100 mx-auto">
        Сохранить
      </button>
    </form>
  )
}

CommentForm.propTypes = {}

export default CommentForm
