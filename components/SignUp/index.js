import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import * as ROUTES from '../../constants/routes'
import { getFireAuth } from '../../helpers/firebaseHelper'
import { setUser } from '../../reducers/User'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

const SignUpForm = () => {
  const [state, setState] = useState(INITIAL_STATE)
  const userStorage = useSelector(state => (state.User))
  const dispatch = useDispatch()

  useEffect(() => {
    if (userStorage.auth) {
      Router.push(ROUTES.LANDING)
    }
  })

  const onSubmit = (event) => {
    event.preventDefault();
    const fireAuth = getFireAuth()
    fireAuth.createUserWithEmailAndPassword(state.email, state.passwordOne)
      .catch((error) => {
        setState({
          ...state,
          error: error.message
        })
        console.log(error)
      })
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user))
        Router.push(ROUTES.LANDING)
      }
    })
  }

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const isInvalid =
    state.passwordOne !== state.passwordTwo ||
    state.passwordOne.length < 6 ||
    state.email.length < 6

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={state.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={state.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">Sign Up</button>
      {state.error ? <p>{state.error}</p> : null}
    </form>
  )
}

const SignUpLink = () => (
  <div>
    <p>Don't have an account?</p>
    <Link href={ROUTES.SIGN_UP}>
      <a>Sign Up</a>
    </Link>
  </div>
)

export default SignUpPage

export { SignUpLink };
