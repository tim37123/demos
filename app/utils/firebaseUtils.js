import firebase from 'firebase';
import {FIREBASE_CONFIG} from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();


export default {
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