import * as Types from "./action-types"

export const pushSttDataToList = (sttData) => ({
    type: Types.PUSH_STT_DATA_TO_LIST,
    payload: sttData
})

export const pushLogDataToList = (logData) => ({
    type: Types.PUSH_LOG_DATA_TO_LIST,
    payload: logData
})

export const setLogList = (logList) => ({
    type: Types.SET_LOGLIST,
    payload: logList
})

export const setSttList = (sttList) => ({
    type: Types.SET_STTLIST,
    payload: sttList
})

export const signOut = () => ({
    type: Types.USER_SIGNOUT
})
