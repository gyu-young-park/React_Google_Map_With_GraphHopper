import * as Types from './action-types'

const initialState = {
  logList: [],
  sttList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PUSH_STT_DATA_TO_LIST: {
      return {
        ...state,
        sttList: [...state.sttList, action.payload]
      }
    }
    case Types.PUSH_LOG_DATA_TO_LIST: {
      return {
        ...state,
        logList: [...state.logList, action.payload]
      }
    }
    case Types.SET_LOGLIST: {
      return {
        ...state,
        logList: [...action.payload]
      }
    }
    case Types.SET_STTLIST: {
      return {
        ...state,
        sttList: [...action.payload]
      }
    }
    case Types.USER_SIGNOUT:
      return initialState
    default:
      return state
  }
}
