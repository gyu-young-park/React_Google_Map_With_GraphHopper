import {
  SET_USER,
  USER_SIGNOUT,
  SET_TOKEN,
  SET_STRAVA_AUTH_CODE,
  SET_USER_STORAGE
} from './action-types'

import {
  setUser,
  userSignOut,
  setToken,
  setStravaAuthCode,
  setUserStorage
} from './actions'

export const initialState = {
  auth: null,
  token: null,
  stravaAuthCode: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_USER:
      return {
        ...state,
        auth: action.payload
      }
    case USER_SIGNOUT:
      return {
        ...state,
        auth: null,
        token: null,
        stravaAuthCode: null
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case SET_STRAVA_AUTH_CODE:
      return {
        ...state,
        stravaAuthCode: action.payload
      }
    case SET_USER_STORAGE:
      return action.payload
    default:
      return{
        ...state,
      }
  }
};

export {
  SET_USER,
  USER_SIGNOUT,
  SET_TOKEN,
  SET_STRAVA_AUTH_CODE,
  SET_USER_STORAGE,
  setUser,
  userSignOut,
  setToken,
  setStravaAuthCode,
  setUserStorage
}
