import {all , fork} from 'redux-saga/effects';
import user from './user';
import googleMap from './googleMap';

export default function* rootSaga(){
  yield all([
    fork(googleMap),
    fork(user)
  ]);
}
