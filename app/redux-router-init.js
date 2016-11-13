/* External dependencies */
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';
import DevTools from './containers/DevTools';
import rootSaga from './sagas';

/* Internal dependencies */
import todoReducer from './reducers/todos';
import routerReducer from './reducers/router-reducer';
import registrationReducer from './reducers/registration';
import rtcReducer from './reducers/rtc_reducer';
import chatReducer from './reducers/chat_reducer';

////////////////////////////////////////////////

/**
 * Combine reducers into root reducer and create store.
 * Note thate 'combineReducers' is a redux-immutable version
 */
const rootReducer = combineReducers({
    todos: todoReducer,
    routing: routerReducer,
    registration: registrationReducer,
    rtcReducer: rtcReducer,
    chat: chatReducer
})

// const initialState = Immutable.List(['Code More!']);
const initialState = Immutable.Map();
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(logger),
    applyMiddleware(sagaMiddleware),
    DevTools.instrument()
  )
);

sagaMiddleware.run(rootSaga);

/* Create enhanced history object for router */
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: createSelectLocationState()
});


////////////////////////////////////////////////

/* Exports */
export { store, history }