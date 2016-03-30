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

	const sessionLoginObs = body => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			method: POST,
			url: url + 'session/login',
			body: JSON.stringify(body)
		})).
		map(parseResponse)

	const userCreateObs = body => Rx.DOM.
		ajax(Object.assign({}, defaultSettings, {
			method: POST,
			url: url + 'users/create',
			body: JSON.stringify(body)
		})).
		map(parseResponse)

	return {
		sessionLoginObs,
		userCreateObs
	}
})()

export default AwsApiObservers