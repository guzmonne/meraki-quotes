import Firebase from 'firebase'

const log = x => {console.log(x); return x}

const getFirebaseRef = url => {
	const ref = new Firebase(url);
	return fetchDelegatedToken(localStorage.getItem('userToken')).
	//then(log).
	then(token => ref.authWithCustomToken(token.id_token)).
	then(authData => {
		return ref;
	})
}

const fetchDelegatedToken = idToken => {
	return fetch('https://conatel.auth0.com/delegation', {
		method: 'post',
		headers: {
			'Authorization': 'Bearer ' + idToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: 'LDRy7rJJOoV1sjZbwEg68F7xVDf8KLsh',
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			id_token: idToken,
			target: 'LDRy7rJJOoV1sjZbwEg68F7xVDf8KLsh',
			scope: 'openid',
			api_type: 'firebase'
		})
	}).
	then(response => {
		return response.json()
	})
}

const count = 0
const listeners = {}	

export const Logs = {
	all(){
		getFirebaseRef('https://mcp-admin.firebaseio.com/Logs/collection').
		then(ref => ref.orderByKey().on('child_added', snapshot => console.log(snapshot.val()))).
		catch(err => {throw new Error(err)})
	}
}
