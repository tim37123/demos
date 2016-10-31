import firebase from 'firebase';
import {FIREBASE_AUTH_CONFIG, FIREBASE_CHAT_CONFIG} from './firebaseConfig';

const firebaseAuthApp = firebase.initializeApp(FIREBASE_AUTH_CONFIG, 'Auth');
const firebaseAuth    = firebaseAuthApp.auth();

const firebaseMsgApp  = firebase.initializeApp(FIREBASE_CHAT_CONFIG, 'Chat');

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

export const Msgs = {

}