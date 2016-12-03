import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {Auth, Chat} from './utils/firebaseUtils';
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
    const {error, user} = yield call(Auth.registerUser,action.creds);
    error ? yield put({type: 'REGISTRATION_FAILED', message: {msg_type: 'error', msg_body: error.message}})
	      : yield put({type: 'REGISTER', user});
}

export function* watchLogout(){
	yield* takeEvery('LOGOUT_USER_ASYNC', logout)
}

export function* logout(action){
    const {error, success} = yield call(Auth.logout);
    if(error){
        yield put({type: 'LOGOUT_FAILED', message: {msg_type: 'error', msg_body: error.message}})
    }else{
        yield put({type: 'LOGOUT_PARTICIPANT_ASYNC', action});
        yield put({type: 'LOGOUT'});
    }
}

export function* watchLogin(){
	yield* takeEvery('LOGIN_USER_ASYNC', login_and_register);
}

export function* login_and_register(action){
    const {error, user} = yield call(Auth.login,action.creds);
    if(error){
        yield put({type: 'LOGIN_FAILED', message: {msg_type: 'error', msg_body: error.message}})
    }else{
        yield put({type: 'LOGIN', user});
        yield put({type: 'ADD_PARTICIPANT_ASYNC', user})
    }
}

export function* watchAddParticipant(){
    yield* takeEvery('ADD_PARTICIPANT_ASYNC', addParticipantOrLogin)
}

export function* addParticipantOrLogin(participant){
    Chat.addParticipantOrLogin(participant);
    yield put({type: 'ADD_PARTICIPANT', participant: participant});
}

export function* watchLogoutParticipant(){
    yield* takeEvery('LOGOUT_PARTICIPANT_ASYNC', logoutParticipant)
}

export function* logoutParticipant(participant){
    Chat.logoutParticipant(participant.action.action);
    yield put({type: 'LOGOUT_PARTICIPANT'});
}

export function* watchUpdateParticipents(){
    yield* takeEvery('UPDATE_PARTICIPANTS_ASYNC', updateParticipants);
}

export function* updateParticipants(participantList){
    yield put({type: 'UPDATE_PARTICIPANTS', participants: participantList});   
}

export function* watchAddMessage(){
    yield* takeEvery('ADD_MESSAGE_ASYNC', addMessage)
}

export function* addMessage(message){
    Chat.addMessage(message);
    yield put({type: 'ADD_MESSAGE', message: message});
}

export function* watchUpdateMessages(){
    yield* takeEvery('UPDATE_MESSAGES_ASYNC', updateMessages);
}

export function* updateMessages(messageList){
    yield put({type: 'UPDATE_MESSAGES', messages: messageList});   
}

export default function* rootSaga() {
  yield [
    watchAddTodo(),
    watchRegister(),
    watchLogout(),
    watchSetUser(),
    watchClearUser(),
    watchLogin(),
    watchAddParticipant(),
    watchLogoutParticipant(),
    watchUpdateParticipents(),
    watchAddMessage(),
    watchUpdateMessages(),
    // watchPeerConnect(),
    // watchGetUserAgent()
  ]
}