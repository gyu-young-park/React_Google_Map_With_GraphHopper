//초기 상태
export const initialState ={
  isThereFile: false,
  instructionsMarkerArray: []
};
//액션
export const CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_TRUE = 'CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_TRUE';
export const CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_FALSE = 'CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_FALSE';
export const CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_SET = 'CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_SET';
export const CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_CLEAR = 'CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_CLEAR';

export const chartForNavigationIsThereGpxFileTrue = {
  type: CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_TRUE,
  data: {
    isThereFile: true,
  }
};

export const chartForNavigationIsThereGpxFileFalse = {
  type: CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_FALSE,
  data: {
    isThereFile: false,
  }
};

export const chartForNavigationInstructionArraySet = (data) => {
  return {
    type: CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_SET,
    data: {instructionsMarkerArray: data}
  }
};

export const chartForNavigationInstructionArrayClear = {
  type: CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_CLEAR,
  data: {
    instructionsMarkerArray: [],
  }
};
//리듀서
export default (state = initialState, action) => {
  switch(action.type){
    case CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_TRUE:
      return {
        ...state,
        ...action.data
      }
    case CHART_FOR_NAVIGATION_IS_THERE_GPX_FILE_FALSE:
      return {
        ...state,
        ...action.data
      }
    case CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_SET:
      return {
        ...state,
        ...action.data
      }
    case CHART_fOR_NAVIGATION_INSTRUCTION_ARRAY_CLEAR:
      return {
        ...state,
        ...action.data
      }
    default:
      return{
        ...state,
      }
  }
};
