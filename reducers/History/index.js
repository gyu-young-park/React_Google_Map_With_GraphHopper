import * as Types from "./action-types"

const initialState = {
    fileName: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_FILENAME:
            return {
                ...state,
                fileName: action.payload
            }
        default:
            return state
    }
}

