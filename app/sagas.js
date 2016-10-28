import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import Firebaseutils from './utils/firebaseUtils';
import rtcUtils from './utils/rtcUtils';

/*
*********************************************************************** TODOs
*/
export function* watchAddTodo(){
	yield* takeEvery('ADD_TODO_ASYNC', addTodoAsync)
}

export function* addTodoAsync(action){
	yield call(delay, 1000)
	yield put({type: 'addTodo', todo: action.todo})
}

/*
*********************************************************************** Registration
*/
export function* watchSetUser(){
	yield* takeEvery('SET_USER_ASYNC', setUser)
}

export function* setUser(action){
	yield put({type: 'SET_USER', user: action.user})
}

export function* watchClearUser(){
	yield* takeEvery('CLEAR_USER_ASYNC', clearUser)
}

export function* clearUser(){
	yield put({type: 'CLEAR_USER'});
}

export function* watchRegister(){
	yield* takeEvery('REGISTER_USER_ASYNC', register)
}

export function* register(action){
    const {error, user} = yield call(Firebaseutils.registerUser,action.creds);
    error ? yield put({type: 'REGISTRATION_FAILED', message: {msg_type: 'error', msg_body: error.message}})
	      : yield put({type: 'REGISTER', user});
}

export function* watchLogout(){
	yield* takeEvery('LOGOUT_USER_ASYNC', logout)
}

export function* logout(){
    const {error, success} = yield call(Firebaseutils.logout);
    error ? yield put({type: 'LOGOUT_FAILED', message: {msg_type: 'error', msg_body: error.message}})
	      : yield put({type: 'LOGOUT'});
}

export function* watchLogin(){
	yield* takeEvery('LOGIN_USER_ASYNC', login)
}

export function* login(action){
    const {error, user} = yield call(Firebaseutils.login,action.creds);
    error ? yield put({type: 'LOGIN_FAILED', message: {msg_type: 'error', msg_body: error.message}})
	      : yield put({type: 'LOGIN', user});
}

/*
*********************************************************************** RTC
*/
export function* watchPeerConnect(){
    yield* takeEvery('PEER_CONNECT_ASYNC', peerConnect)
}

export function* peerConnect(){
    let peerConnection = rtcUtils.buildPeerConnection();
    let dataConnection = rtcUtils.buildDataConnection(peerConnection);
    yield put({type: "SET_PEER_CONNECTION", connection: {peerConnection: peerConnection, dataConnection: dataConnection}})
}

export function* watchGetUserAgent(){
    yield* takeEvery('GET_USER_AGENT_ASYNC', getUserAgent)
}

export function* getUserAgent(){
    let UA = rtcUtils.createUserAgent();
    yield put({type: 'SET_USER_AGENT', agent: UA})
}

export default function* rootSaga() {
  yield [
    watchAddTodo(),
    watchRegister(),
    watchLogout(),
    watchSetUser(),
    watchClearUser(),
    watchLogin(),
    watchPeerConnect(),
    watchGetUserAgent()
  ]
}