import React from "react"
import PropTypes from "prop-types"
import SelectField from "../common/form/selectField"
import TextAreaField from "../common/form/textAreaField"

const CommentForm = ({ users, comment, errors, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <SelectField
        label="Выберите пользователя"
        name="userId"
        defaultOption="Выберите..."
        value={comment.userId}
        onChange={onChange}
        options={users}
        error={errors.users}
      />
      <TextAreaField
        label="Комментарий"
        name="comment"
        value={comment.comment}
        onChange={onChange}
        error={errors.comment}
      />
      <button className="btn btn-primary w-100 mx-auto">
        Сохранить
      </button>
    </form>
  )
}

CommentForm.propTypes = {
  users: PropTypes.array,
  comment: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default CommentForm
