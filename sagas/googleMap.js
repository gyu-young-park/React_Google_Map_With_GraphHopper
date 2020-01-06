import {all, fork ,takeLatest, takeEvery, call, put,take} from 'redux-saga/effects';
import {NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE, NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE} from '../reducers/googleMap';


//액션 사가 함수
function* watchSetRouteDisplayTrue(){
  yield takeLatest(NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE,callBackRouteDispalyTrueFunc);
}

function* watchSetRouteDisplayFalse(){
  yield takeLatest(NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_FALSE,callBackRouteDispalyFalseFunc);
}

function* helloSaga(){
  yield take("HELLO_SAGA");
  yield put({
    type: "bye-saga"
  })
}

//콜백 함수
function callBackRouteDispalyTrueFunc(){
  console.log("route display");
}

function callBackRouteDispalyFalseFunc(){
  console.log("route undisplay");
}

export default function* googleMapSaga(){
  yield all([fork(watchSetRouteDisplayTrue), fork(watchSetRouteDisplayFalse),fork(helloSaga)]);
}
