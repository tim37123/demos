import firebase from 'firebase';
import {FIREBASE_AUTH_CONFIG, FIREBASE_CHAT_CONFIG} from './firebaseConfig';

const firebaseRef	  = firebase.initializeApp(FIREBASE_AUTH_CONFIG);
const firebaseAuth    = firebaseRef.auth();
const firebaseDB	  = firebaseRef.database();

export const Auth = {
	registerUser: creds => {
	    return firebaseAuth.createUserWithEmailAndPassword(creds.email, creds.password)
	    .then(user => ({user}))
	    .catch(error => ({error}))
	},

	authChanged: (callback) =>{
		return firebaseAuth.onAuthStateChanged(callback);
	},

	login: creds => {
	    return firebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
			    .then(user => ({user}))
			    .catch(error => ({error}))
	},	

	logout: () => {
		return firebaseAuth.signOut()
				.then(success => ({success}))
	    		.catch(error => ({error}))
	}
}

export const Chat = {
	addParticipant: participant => {
		var newParticipant = {};
		newParticipant['/participants/' + participant.user.uid] = participant.user.email;
		return firebaseDB.ref().update(newParticipant);
	},
	deleteParticipant: participant => {
		firebaseDB.ref('participants/' + participant.uid).remove();
	},
	getParticipantsRef: () => {
		var partipantRef = firebase.database().ref('participants/');
		return partipantRef;
	},
	addMessage: message => {
		const messageRef = firebaseDB.ref('messages/');
		return messageRef.push(message.msg);
	},
}
