import React from 'react';
import * as axios from 'axios';
import s from'./AuthForm.module.css';
import {connect} from 'react-redux';
import { FieldArray, Field, reduxForm } from 'redux-form';

import {NotificationsAC} from '../../redux/NotificationsReducer';

//Валидация
const required = value => (value || typeof value === 'number' ? undefined : 'Обязательный, (+79876543210)')
const phoneMin = value => value.slice(2).replace(/[^\d]/g, '').length < 10?  "Номер введен не полностью, (+79876543210)": undefined
const phoneMax = value => value.slice(2).replace(/[^\d]/g, '').length > 10?  "Номер введен большой, (+79876543210)": undefined

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
    <div className={s.Container}>
      <div className={s.AuthForm}>
        <div className={s.Title}>Вход</div>
        <form className={s.Form} onSubmit={Submit}>
          <div className={s.FormItem}>
            <Field
              name="Phone" 
              type="phone"
              component={renderField} 
              label="Телефон"
              validate={[ required, phoneMin, phoneMax]}
              normalize={normalizePhone}
            />
          </div>
          <div className={s.FormItem}>
            <Field
              name="Password"
              type="password"
              component={renderField}
              label="Пароль"
              validate={[required]}
            />
          </div>
          <div className={s.FormButtons}>
            <div>
              <button className={s.Reset} type="button" disabled={pristine || submitting} onClick={reset}>Стереть</button>
            </div>
            <div>
              <button className={s.Submit} type="submit" disabled={submitting}>Авторизация</button>
            </div>
          </div>
        </form>
      </div>
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
            sessionStorage.setItem("Token", response.data.Token)
            sessionStorage.setItem("UserName", response.data.UserName)
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
