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
        yield put({type: 'DELETE_PARTICIPANT_ASYNC', action});
        yield put({type: 'LOGOUT'});
    }
}

export function* watchLogin(){
	yield* takeEvery('LOGIN_USER_ASYNC', login_and_register)
}

export function* login_and_register(action){
    const {error, user} = yield call(Auth.login,action.creds);
    if(error){
        yield put({type: 'LOGIN_FAILED', message: {msg_type: 'error', msg_body: error.message}})
    }else{
        yield put({type: 'LOGIN', user});
        // yield put({type: 'GET_USER_AGENT_ASYNC', user})
        yield put({type: 'ADD_PARTICIPANT_ASYNC', user})
    }
}

/*
*********************************************************************** RTC
*/
// export function* watchPeerConnect(){
//     yield* takeEvery('PEER_CONNECT_ASYNC', peerConnect)
// }

// export function* peerConnect(){
//     let peerConnection = rtcUtils.buildPeerConnection();
//     let dataConnection = rtcUtils.buildDataConnection(peerConnection);
//     yield put({type: "SET_PEER_CONNECTION", connection: {peerConnection: peerConnection, dataConnection: dataConnection}})
// }

// export function* watchGetUserAgent(){
//     yield* takeEvery('GET_USER_AGENT_ASYNC', getUserAgent)
// }

// export function* getUserAgent(login_obj){
//     const email = login_obj.user.email;
//     const sip_reg_name = email.substr(0, email.indexOf('@'));
//     let UA = rtcUtils.createUserAgent(sip_reg_name);
//     yield put({type: 'SET_USER_AGENT', agent: UA});
//     // yield put({type: 'SET_PARTICIPANT_ASYNC', participant: sip_reg_name})
// }

/*
*********************************************************************** Chat
*/

export function* watchAddParticipant(){
    yield* takeEvery('ADD_PARTICIPANT_ASYNC', addParticipant)
}

export function* addParticipant(participant){
    Chat.addParticipant(participant);
    yield put({type: 'ADD_PARTICIPANT', participant: participant});
}

export function* watchDeleteParticipant(){
    yield* takeEvery('DELETE_PARTICIPANT_ASYNC', deleteParticipant)
}

export function* deleteParticipant(participant){
    console.log('deleteParticipant Called')
    Chat.deleteParticipant(participant);
    yield put({type: 'DELETE_PARTICIPANT'});
}

export function* watchUpdateParticipents(){
    yield* takeEvery('UPDATE_PARTICIPANTS_ASYNC', updateParticipants);
}

export function* updateParticipants(participantList){
    console.log('participants changed');
    yield put({type: 'UPDATE_PARTICIPANTS', participants: participantList});   
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
    watchDeleteParticipant(),
    watchUpdateParticipents(),
    // watchPeerConnect(),
    // watchGetUserAgent()
  ]
}