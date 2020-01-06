//초기 상태
export const initialState ={
  isMakePolyLine: false,
  jsonResponse: {},
  selectedInstruction : [],
  centerData: { lat: 45.4211, lng: -75.6903 },
  markerState : []
};
//액션
export const NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE = 'NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE';
export const NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE = 'NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE';
export const NAVIGATION_PAGE_FILL_JSON_RESPONSE = 'NAVIGATION_PAGE_FILL_JSON_RESPONSE';
export const NAVIGATION_PAGE_FLUSH_JSON_RESPONSE = 'NAVIGATION_PAGE_FLUSH_JSON_RESPONSE';
export const NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION = 'NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION';
export const NAVIGATION_PAGE_FLUSH_SELECTED_INSTRUCTION = 'NAVIGATION_PAGE_FLUSH_SELECTED_INSTRUCTION';
export const NAVIGATION_PAGE_SET_GOOGLE_MAP_CENTER_POSITION_SET = 'NAVIGATION_PAGE_SET_GOOGLE_MAP_CENTER_POSITION_SET';
export const NAVIGATION_PAGE_SET_MARKER_STATE = 'NAVIGATION_PAGE_SET_MARKER_STATE';



export const navigationPageSetGoogleMapRoutingDisplayTrue = {
  type: NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE,
  data: {
    isMakePolyLine: true,
  }
};

export const navigationPageSetGoogleMapRoutingDisplayFalse = {
  type: NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE,
  data: {
    isMakePolyLine: false,
  }
};

export const navigationPageFlushJsonResponse = {
  type: NAVIGATION_PAGE_FLUSH_JSON_RESPONSE,
  data: {
    jsonResponse: {},
  }
};

export const navigationPageFlushSelectedInstruction = {
  type : NAVIGATION_PAGE_FLUSH_SELECTED_INSTRUCTION,
  data : []
};

export const navigationPageSetGoogleMapCenterPositionSet = (data) => {
  return {
    type: NAVIGATION_PAGE_SET_GOOGLE_MAP_CENTER_POSITION_SET,
    data: {
      centerData: data,
    }
  }
};
//리듀서
export default (state = initialState, action) => {
  switch(action.type){
    case NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE:
      return {
        ...state,
        ...action.data
      }
    case NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE:
      return {
        ...state,
        ...action.data
      }
    case NAVIGATION_PAGE_FILL_JSON_RESPONSE:
      return {
        ...state,
        ...action.data
      }
    case NAVIGATION_PAGE_FLUSH_JSON_RESPONSE:
      return {
        ...state,
        ...action.data
      }
    case NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION:
      return {
        ...state,
        selectedInstruction : action.data
      }
    case NAVIGATION_PAGE_FLUSH_SELECTED_INSTRUCTION:
      return {
        ...state,
        selectedInstruction : action.data
      }
    case NAVIGATION_PAGE_SET_GOOGLE_MAP_CENTER_POSITION_SET:
      return {
        ...state,
        ...action.data
      }
    case NAVIGATION_PAGE_SET_MARKER_STATE:
      return {
        ...state,
        markerState : action.data
      }
    default:
      return{
        ...state,
      }
  }
};
