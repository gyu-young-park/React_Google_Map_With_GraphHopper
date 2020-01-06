import React, { useState, useEffect } from 'react'
import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setStravaAuthCode } from '../../reducers/User'
import { getStravaTokenFirebase, getFireAuth } from '../../helpers/firebaseHelper'

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const SignInForm = () => {
  const [state, setState] = useState(INITIAL_STATE)
  const userStorage = useSelector(state => (state.User))
  const dispatch = useDispatch()

  useEffect(() => {
    if (userStorage.auth)
      Router.push(ROUTES.LANDING)
  })

  const onSubmit = (event) => {
    const fireAuth = getFireAuth();
    fireAuth.signInWithEmailAndPassword(state.email, state.password)
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        getStravaTokenFirebase(user.uid).then(stravaToken => {
          if (stravaToken)
            dispatch(setStravaAuthCode(stravaToken))
        }).catch(error => { console.error(error) })
        dispatch(setUser(user))
        Router.push(ROUTES.LANDING)
      }
    })
    event.preventDefault();
  }

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const isInvalid = state.password === '' || state.email === ''

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
        name="password"
        value={state.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  )
}

export default SignInPage
