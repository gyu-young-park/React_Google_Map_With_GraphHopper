import {
  SET_USER,
  USER_SIGNOUT,
  SET_TOKEN,
  SET_STRAVA_AUTH_CODE,
  SET_USER_STORAGE
} from './action-types'

export function setUser (payload) {
  return {
    type: SET_USER,
    payload: payload
  }
}

export function setStravaAuthCode (payload) {
  return {
    type: SET_STRAVA_AUTH_CODE,
    payload: payload
  }
}

export function userSignOut () {
  return {
    type: USER_SIGNOUT
  }
}

export function setToken (payload) {
  return {
    type: SET_TOKEN,
    payload: payload
  }
}

export function setUserStorage (payload) {
  return {
    type: SET_USER_STORAGE,
    payload: payload
  }
}
