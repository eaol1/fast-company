import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import api from "../../api"
import { validator } from "../../utils/validator"
import CheckBoxField from "../common/form/checkBoxField"
import MultiSelectField from "../common/form/multiSelectField"
import RadioField from "../common/form/radioField"
import SelectField from "../common/form/selectField"
import TextField from "../common/form/textField"

const EditForm = () => {
  const params = useParams()
  const { userId } = params
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profession: {},
    qualities: [],
    licence: false
  })

  const [data, setData] = useState({})
  const [qualities, setQualities] = useState({})
  const [professions, setProfession] = useState([])
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите свою профессию"
      }
    },
    qualities: {
      isRequired: {
        message: "Выберите качество"
      }
    },
    licence: {
      isRequired: {
        message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  }

  useEffect(() => {
    validate()
  }, [user])

  useEffect(() => {
    api.users
      .getById(userId)
      .then((data) =>
        setUser({
          ...data,
          profession: data.profession._id,
          qualities: data.qualities.map((quality) => ({
            label: quality.name,
            value: quality._id,
            color: quality.color
          })),
          password: data.password ? data.password : "",
          licence: false
        })
      )
      .then(() => setLoading(false))
    api.professions
      .fetchAll()
      .then((profession) => setProfession(profession))
    api.qualities.fetchAll().then((quality) => setQualities(quality))
  }, [])

  const validate = () => {
    const errors = validator(user, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0 || false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    if (user) {
      let index = 0
      professions.map((prof, i) => {
        if (prof._id === e.target.profession.value) {
          index = i
        }
        return index
      })
      setData(user)
      setData(prevStat => ({
        ...prevStat,
        profession: professions[index],
        qualities: prevStat.undefined.map(quality => ({
          color: quality.color,
          name: quality.label,
          _id: quality.value
        }))
      }))
    }

    api.users.update(data._id, data).then((data) => {
      // setUser(data)
      handleBackward()
    })
  }

  const history = useHistory()

  const handleBackward = () => {
    history.push("/users/" + user._id)
  }

  if (user) {
    console.log("Data", data)

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h2>Редактирование пользователя</h2>
            {!loading && (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <TextField
                  label="Пароль"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  name="profession"
                  defaultOption="Выберите..."
                  value={user.profession}
                  onChange={handleChange}
                  options={professions}
                  error={errors.profession}
                />
                <RadioField
                  name="sex"
                  value={user.sex}
                  onChange={handleChange}
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                  ]}
                  label="Выберите ваш пол"
                />
                <MultiSelectField
                  options={qualities}
                  qualitiesValue={user.qualities}
                  onChange={handleChange}
                  name="qualities"
                  error={errors.qualities}
                />
                <CheckBoxField
                  value={user.licence}
                  onChange={handleChange}
                  name="licence"
                  error={errors.licence}
                >
                  Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-sm me-3"
                    onClick={() => { handleBackward() }}
                  >
                    Назад
                  </button>
                  <button className="btn btn-primary w-100 mx-auto">
                      Сохранить
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EditForm
