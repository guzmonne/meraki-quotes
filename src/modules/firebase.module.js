import Firebase from 'firebase'
import Rx from 'rx'
import RxDOM from 'rx-dom'
import onObservable from './on-observable.module.js'

const log = x => {console.log(x); return x}

const getFirebaseRefObs = url => Rx.Observable.
	just(new Firebase(url)).
	flatMap(ref => Rx.Observable.
		if(() => !!ref.getAuth(), 
			Rx.Observable.just(ref),
			fetchFirebaseRefObs(ref)
		)
	)

const fetchFirebaseRefObs = ref => Rx.Observable.
	fromPromise(fetchDelegatedToken(localStorage.getItem('userToken'))).
	flatMap(token => Rx.Observable.
		fromPromise(ref.authWithCustomToken(token.id_token)).
		map(authData => ref)
	)

const getFirebaseRef = ref => {
	return fetchDelegatedToken(localStorage.getItem('userToken')).
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

const onObs = (ref, event) => Rx.Observable.create(observer => {
	ref.on(event, snapshot => observer.onNext(snapshot))
	return () => ref.off(event);
})

export const Logs = {
	all(){
		return getFirebaseRefObs('https://mcp-admin.firebaseio.com/Logs/collection').
			flatMap(ref => onObservable('child_added', ref.orderByKey()))
	}
}

export const Session = {
	logout(){
		(new Firebase('https://mcp-admin.firebaseio.com')).unauth()
	}
}