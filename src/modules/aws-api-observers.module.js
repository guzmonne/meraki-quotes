import Rx from 'rx-dom'

const AwsApiObservers = (function(){
	const GET    = 'GET'
	const POST   = 'POST'
	const PUT    = 'PUT'
	const DELETE = 'DELETE'

	const url = 'https://8ewstzbc9l.execute-api.us-east-1.amazonaws.com/test/'
	const defaultSettings = {
		method: GET,
		headers: {
			'Auth': 'allow'
		}
	}

	const parseResponse = output => {
		if (output && output.response)
			output.response = JSON.parse(output.response)
		return output
	}

	const ajaxObs = settings => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, settings)).
		map(parseResponse)

	const sessionLoginObs = body => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			method: POST,
			url   : url + 'session/login',
			body  : JSON.stringify(body)
		})).
		map(parseResponse)

	const userCreateObs = body => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			method: POST,
			url   : url + 'users/create',
			body  : JSON.stringify(body)
		})).
		map(parseResponse)

	const usersIndexObs = () => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			url: url + 'users/index'
		})).
		map(parseResponse)

	const userShowObs = email => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			url: `${url}users/${email}`
		})).
		map(parseResponse)

	const userPermissionsIndexObs = () =>
		ajaxObs({
			url: url + 'users/permissions'
		})

	const userPermissionsUpdateObs = (email, permissions) =>
		ajaxObs({
			url    : `${url}/users/permissions/${btoa(email)}`,
			method : PUT,
			body   : JSON.stringify({email, permissions})
		})

	return {
		sessionLoginObs,
		userCreateObs,
		usersIndexObs,
		userShowObs,
		userPermissionsIndexObs,
		userPermissionsUpdateObs
	}
})()

export default AwsApiObservers