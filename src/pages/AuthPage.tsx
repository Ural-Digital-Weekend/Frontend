import React, {ChangeEvent, FormEvent, MouseEvent, useState} from 'react'
import {IAuth} from "../models/models"
import {useAppDispatch} from "../hooks/redux";
import {login, register} from "../store/ActionCreators";
import {useNavigate} from "react-router-dom";

export function AuthPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState<IAuth>({
    password: '',
    username: ''
  })

  const isFormValid = () => {
    return form.password.trim().length && form.username.trim().length
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isFormValid()) {
      await dispatch(register(form))
      navigate('/')
    } else {
      alert('Form is invalid!')
    }
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const loginHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (isFormValid()) {
      await dispatch(login(form))
      navigate('/')
    } else {
      alert('Form is invalid!')
    }
  }

  return (
    <form
      className="container mx-auto mt-8 p-4 flex justify-center"
      onSubmit={submitHandler}
    >
      <div>
        <div>
          <label htmlFor="username" className="mr-2">Username</label>
          <input type="text" id="username" className="border" name="username" onChange={changeHandler} />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mr-2">Password</label>
          <input
            type="password"
            id="password"
            className="border"
            name="password" onChange={changeHandler} />
        </div>

        <button
          type="submit"
          className="border py-2 px-4 mr-4"
        >
          Register
        </button>

        <button
          type="button"
          className="border py-2 px-4"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </form>
  )
}