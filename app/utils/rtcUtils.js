import SIP from 'sip.js';
// var pc = new RTCPeerConnection(servers,{optional: [{RtpDataChannels: true}]});

function createPeerConnection(){
	var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
	 try {
	    // Create an RTCPeerConnection via the polyfill (adapter.js).
	    return new RTCPeerConnection(pc_config);
	  } catch (e) {
	    console.log("Failed to create PeerConnection, exception: " + e.message);
	    return;
	}
}

function createDataConnection(peerConnection){
	let dataConstraint = null;
	return peerConnection.createDataChannel('dataChannel',dataConstraint);
}

function ICECallback(event, peercandidate){
	if (event.candidate) {
      peerConnection.addIceCandidate(
      event.candidate
    ).then(
      () => console.log('ICE candidate successfully added'),
      () => console.log('adding ICE candidate failed')
    );
  }
}

function onCreateSessionDescriptionError(){
	console.log("")
}

function onSessionConnecting(){
	console.log("")
}

function onSessionOpened(){
	console.log("")
}

function onRemoteStreamAdded(){
	console.log("")
}

function onRemoteStreamRemoved(){
	console.log("")
}

function onSendChannelStateChange(){
	console.log("")
}

function onSendChannelStateChange(){
	console.log("")
}

export default{
	createUserAgent: () => {
		var config = {
		  // Replace this IP address with your FreeSWITCH IP address
		  uri: '1000@192.168.1.215',

		  // Replace this IP address with your FreeSWITCH IP address
		  // and replace the port with your FreeSWITCH port
		  ws_servers: 'ws://192.168.1.215:5066',

		  // FreeSWITCH Default Username
		  authorizationUser: '1000',

		  // FreeSWITCH Default Password
		  password: '1234'
		};

		return new SIP.UA(config);
	},

	buildPeerConnection: () => {
		  let pc = createPeerConnection()
		  pc.onicecandidate = ICECallback(pc);
		  pc.onconnecting = onSessionConnecting;
		  pc.onopen = onSessionOpened;
		  pc.onaddstream = onRemoteStreamAdded;
		  pc.onremovestream = onRemoteStreamRemoved;
		  return pc;
	},

	buildDataConnection: (pc) => {
		  let dc = createDataConnection(pc);
		  dc.onopen = onSendChannelStateChange;
  		  dc.onclose = onSendChannelStateChange;
  		  return dc;
	},

	createOffer: (pc) => {
	  localConnection.createOffer().then(
		gotDescription,
		onCreateSessionDescriptionError
	  );
	},

	createAnswer: (pc) => {
		localConnection.createAnswer().then(
		gotDescription,
		onCreateSessionDescriptionError
	  );
	}
}