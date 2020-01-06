// lib/redux.js
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import googleMap from './googleMap'
import chart from './ChartForNavigation'
import User from './User'
import Activity from './Activity'
import History from './History'
import { combineReducers } from 'redux'


const SET_CLIENT_STATE = 'SET_CLIENT_STATE';

export const makeStore = (initialState, { isServer, req, debug, storeKey }) => {
  let store = null;
  const sagaMiddleware = createSagaMiddleware();
  if (isServer) {
    initialState = initialState || { fromServer: 'foo' };

    const rootReducer = combineReducers({
      User,
      googleMap,
      chart,
      Activity,
      History,
    })

    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        sagaMiddleware
      )
    )
  } else {// we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const userPersistConfig = {
      key: 'User',
      stateReconciler: hardSet,
      storage
    }

    const activityPersistConfig = {
      key: 'Activity',
      stateReconciler: hardSet,
      storage
    }

    const rootReducer = combineReducers({
      User: persistReducer(userPersistConfig, User),
      Activity: persistReducer(activityPersistConfig, Activity),
      History,
      googleMap,
      chart
    })

    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        logger,
        sagaMiddleware
      )
    )
    store.__persistor = persistStore(store) // Nasty hack // injung
  }
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store;
};

export const setClientState = (clientState) => ({
  type: SET_CLIENT_STATE,
  payload: clientState
});
