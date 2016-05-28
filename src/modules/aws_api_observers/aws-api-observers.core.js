import Rx from 'rx-dom'
/*
	CONSTANTS
 */
export const GET    = 'GET'
export const POST   = 'POST'
export const PUT    = 'PUT'
export const DELETE = 'DELETE'

export const url = 'https://8ewstzbc9l.execute-api.us-east-1.amazonaws.com/test/'

/*
	PRIVATE METHODS
 */
const defaultSettings = () => ({
	method       : GET,
	responseType : 'json',
	headers      : {
		'Authorization': `Bearer ${getToken()}`,
		'Content-Type' : 'application/json'
	},
	redirect: true
})

const parseResponse = output => {
	if (output && output.response)
		output.response = JSON.parse(output.response)
	return output
}

const getHeaders = () => {
	const headers = {'Content-Type' : 'application/json'}
	if (window && window.localStorage && window.localStorage.token)
		headers['Authorization'] = getToken()
	return headers
}

const getToken = () => window.localStorage.token

/* Public Methods */
export const ajaxObs = settings => 
	Rx.DOM.
		ajax(Object.assign({}, defaultSettings(), settings)).
		flatMap(result => 
			result && result.response && result.response.errorMessage ?
			Rx.Observable.throw(result.response.errorMessage)         :
			Rx.Observable.just(result)
		).
		retry(3).
		doOnError(result => {
			if (result.type === "error" && result.status === 0 && settings.redirect === true){
				delete localStorage.token
				location.href = '/login'
				return Rx.Observable.throw('403 Not authorized')
			} else {
				return Rx.Observable.just(result)
			}
		}).
		share()