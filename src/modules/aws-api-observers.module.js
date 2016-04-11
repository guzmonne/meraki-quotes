import Rx from 'rx-dom'
import _  from 'lodash'

const AwsApiObservers = function(){
	/*
		CONSTANTS
	 */
	const GET    = 'GET'
	const POST   = 'POST'
	const PUT    = 'PUT'
	const DELETE = 'DELETE'

	const url = 'https://8ewstzbc9l.execute-api.us-east-1.amazonaws.com/test/'
	const defaultSettings = () => ({
		method       : GET,
		responseType : 'json',
		headers      : {
			'Authorization': `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
	})
	/*
		PRIVATE METHODS
	 */
	const parseResponse = output => {
		if (output && output.response)
			output.response = JSON.parse(output.response)
		return output
	}

	const ajaxObs = settings => Rx.DOM.
		ajax(Object.assign({}, defaultSettings(), settings))
	
	const getToken = () => localStorage.token
	/*
		SESSION PUBLIC OBSERVABLE CONSTRUCTORS
	 */
	const sessionLoginObs = body => 
		ajaxObs({
			method: POST,
			url   : url + 'session/login',
			body  : JSON.stringify(body)
		})
	/*
		USERS PUBLIC OBSERVABLE CONSTRUCTORS
	 */
	const userCreateObs = body =>
		ajaxObs({
			method: POST,
			url   : url + 'users/create',
			body  : JSON.stringify(body)
		})

	const usersIndexObs = () =>
		ajaxObs({
			url: url + 'users/index'
		})

	const userShowObs = email => 
		ajaxObs({
			url: `${url}users/${email}`
		})
		
	const userPermissionsIndexObs = () =>
		ajaxObs({
			url: url + 'users/permissions'
		})

	const userPermissionsUpdateObs = (email, permissions) =>
		ajaxObs({
			url          : `${url}users/permissions/${btoa(email)}`,
			method       : PUT,
			body         : JSON.stringify({email, permissions})
		})

	const merakiDevicesIndexObs = (paginationKey, pageSize=10, query) => {
		let queryString

		paginationKey = (!!paginationKey && !!paginationKey.PartNumber && !!paginationKey.Category) ? 
			`PartNumber=${paginationKey.PartNumber}&Category=${paginationKey.Category}` : "" 
		pageSize = typeof pageSize === "number" ? `PageSize=${pageSize}` : ""

		if (!!paginationKey || !!pageSize || query)
			queryString = '?'

		if (!!paginationKey)
			queryString = `${queryString}${paginationKey}`
		if (!!pageSize)
			queryString = `${queryString}${pageSize}`
		if (!!query)
			queryString = `${queryString}&Query=${query}`

		return ajaxObs({
			url: `${url}meraki-quotes/meraki-devices/index${queryString}`
		})
	}

	const merakiDevicesCreateObs = model => 
		ajaxObs({
			url: `${url}meraki-quotes/meraki-devices/create`,
			method: POST,
			body: JSON.stringify(model)
		})

	const merakiDevicesDestroyObs = devices =>
		ajaxObs({
			url: `${url}meraki-quotes/meraki-devices/destroy`,
			method: DELETE,
			body: JSON.stringify({devices})
		})

	// ------------- //
	// MERAKI QUOTES //
  // ------------- //
  
  const merakiQuotesCreateObs = quote =>
  	ajaxObs({
  		url: `${url}meraki-quotes/create`,
  		method: POST,
  		body: JSON.stringify({quote})
  	})

  const merakiQuotesIndexObs = (PageSize, createdAt) => {
  	const options = [PageSize, createdAt].
  		map((x, i) => !!x ? `${i === 0 ? 'PageSize' : 'createdAt'}=${x}` : null).
  		filter(x => x !== null).
  		join('&')

  	console.log(options)

  	let _url = `${url}meraki-quotes/index`

  	if (_.isString(options) && options !== ""){
  		_url = `${_url}?${options}`
  	}

  	return ajaxObs({
  		url: _url
  	})
  }

	return {
		// SESSION
		sessionLoginObs,
		// USERS
		userCreateObs,
		usersIndexObs,
		userShowObs,
		userPermissionsIndexObs,
		userPermissionsUpdateObs,
		// MERAKI DEVICES
		merakiDevicesIndexObs,
		merakiDevicesCreateObs,
		merakiDevicesDestroyObs,
		// MERAKI QUOTES
		merakiQuotesCreateObs,
		merakiQuotesIndexObs
	}
}

export default new AwsApiObservers()