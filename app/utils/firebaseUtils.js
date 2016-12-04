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
	addParticipantOrLogin: participant => {
		firebaseDB.ref('participants/').child(participant.user.uid).once('value', function(snapshot){
			if(snapshot.val() != null){
				firebaseDB.ref('participants/' + participant.user.uid).update({
					'/present': true
				})
			}else{
				var newParticipant = {};
				newParticipant['/participants/' + participant.user.uid] = {email: participant.user.email, username: '', phone: '', present: true};
				firebaseDB.ref().update(newParticipant);
			}
		});
	},
	logoutParticipant: participant => {
		console.log("LOGOUT")
		console.log(participant)
		firebaseDB.ref('participants/' + participant.uid).update({
			'/present': false
		})
	},
	checkParticipant: (key) => {
		const partRef =  firebaseDB.ref('participants/');
		partRef.once("value", function(data) {
		  return data;
		});
	},
	getParticipantsRef: () => {
		return firebaseDB.ref('participants/');
	},
	updateUserInfo: info => {
		info = info.info
		const userInfoRef = firebaseDB.ref('participants/' + info.uid);
		userInfoRef.update({
			'/username': info.userUpdateInfo.userName,
			'/phone': info.userUpdateInfo.phone
		})
	},
	getMessagesRef: () => {
		return firebaseDB.ref('messages/');
	},
	addMessage: message => {
		const messageRef = firebaseDB.ref('messages/');
		return messageRef.push(message.msg);
	},
}
