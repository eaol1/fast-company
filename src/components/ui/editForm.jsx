import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import api from "../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"

const EditForm = () => {
  const params = useParams()
  const { userId } = params
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const [qualities, setQualities] = useState({})
  const [professions, setProfession] = useState([])
  const [errors, setErrors] = useState({})
  const handleChange = (target) => {
    setData(prevState => ({
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
  }, [data])

  useEffect(() => {
    api.users.getById(userId).then(data => setData({
      ...data,
      profession: data.profession._id,
      qualities: data.qualities.map(quality => ({ label: quality.name, value: quality._id })),
      passowrd: data.password ? data.password : ""
    }))
    api.professions.fetchAll().then(data => setProfession(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  }, [])

  if (data) {
    // console.log("Users", users)
    console.log("Data", data)
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0 || false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        defaultOption="Выберите..."
        value={data.profession}
        onChange={handleChange}
        options={professions}
        error={errors.profession}
      />
      <RadioField
        name="sex"
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
      />
      <MultiSelectField
        options={qualities}
        selectOption={data.qualities}
        onChange={handleChange}
        name="qualities"
        error={errors.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default EditForm
