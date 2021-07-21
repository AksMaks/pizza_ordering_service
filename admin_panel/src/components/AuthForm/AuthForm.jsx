import React from 'react';
import * as axios from 'axios';
import {connect} from 'react-redux';
import { FieldArray, Field, reduxForm } from 'redux-form';

import {NotificationsAC} from '../../redux/NotificationsReducer';

//Валидация
const required = value => (value || typeof value === 'number' ? undefined : 'Обязательный')
const phone = value => value.slice(3).replace(/[^\d]/g, '').length < 10?  "Номер введен не полностью": undefined

//нормализация номера телефона (приведение к шаблону "+7 999-999-999")
const normalizePhone = (value) => {
  if (!value) {
    return value
  }

  const onlyNums = value.slice(3).replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return `+7 ${onlyNums}`
  }
  if (onlyNums.length <= 7) {
    return `+7 ${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `+7 ${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const AuthForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  let Submit = (date) => {
    handleSubmit(date)
    reset()
  }
	return (
    <div>
      <form onSubmit={Submit}>
        <Field
          name="Phone" 
          type="phone"
          component={renderField} 
          label="Телефон"
          validate={[ required, phone ]}
          normalize={normalizePhone}
        />
        <Field
          name="Password"
          type="password"
          component={renderField}
          label="Пароль"
          validate={[required]}
        />
        <div>
          <button type="submit" disabled={submitting}>
            Авторизация
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Стереть
          </button>
        </div>
      </form>
    </div>
  )
};

let mapStateToProps = (state) => {
	return {
    form: "Auth",
  };
}; 

let mapDispatchToProps = (dispatch) => {
	return {
    onSubmit: (FormData) => {
      axios.post('/api/User/auth', {...FormData})
        .then(function (response) {
          if(!response.data.Error){
            localStorage.setItem("Token", response.data.Token)
            localStorage.setItem("UserName", response.data.UserName)
            dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.data.Message}));
            window.location.href = "/"
          }else{
            dispatch(NotificationsAC.SetNotification({Type: "Error", Message: response.data.Message}));
          }
        })
    }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(AuthForm));
