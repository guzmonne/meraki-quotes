import Rx from 'rx-dom'
import _  from 'lodash'

import {
	ajaxObs,
	url,
	GET,
	POST,
	PUT,
	DELETE
} from './aws_api_observers/aws-api-observers.core.js'
import { userChangePasswordObs } from './aws_api_observers/users-api.observers.js'

const AwsApiObservers = function(){

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
			url   : `${url}users/permissions/${btoa(email)}`,
			method: PUT,
			body  : JSON.stringify({email, permissions})
		})

	const userVerificationObs = (email, verificationToken) =>
		ajaxObs({
			url     : `${url}activate-account`,
			method  : POST,
			body    : JSON.stringify({email, verificationToken}),
			redirect: false
		})

	// -------------- //
	// MERAKI DEVICES //
  // -------------- //
	const merakiDevicesIndexObs = (paginationKey, pageSize=10, query) => {
		let queryString

		paginationKey = (!!paginationKey && !!paginationKey.PartNumber && !!paginationKey.Category) ? 
			`PartNumber=${paginationKey.PartNumber}&Category=${paginationKey.Category}` : "" 
		pageSize = typeof pageSize === "number" ? `&PageSize=${pageSize}` : ""

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

	const merakiDevicesGetAllObs = () =>
		ajaxObs({
			url: `${url}meraki-quotes/meraki-devices/all`
		})

	// ------------- //
	// MERAKI QUOTES //
  // ------------- //
  const merakiQuotesIndexOptions = (PageSize, createdAt, QueryString) =>
  	[
  		{
  			name: 'PageSize',
  			value: PageSize
  		},
  		{
  			name: 'createdAt',
  			value: createdAt
  		}, 
  		{
  			name: 'QueryString',
  			value: QueryString
  		}
  	]
  
  const merakiQuotesCreateObs = quote => ajaxObs({
  		url: `${url}meraki-quotes/create`,
  		method: POST,
  		body: JSON.stringify({quote})
  	})

  const merakiQuotesIndexObs = (PageSize, createdAt, QueryString) => {
  	const options = merakiQuotesIndexOptions(PageSize, createdAt, QueryString).
  		map(x => !!x.value ? `${x.name}=${x.value}` : null).
  		filter(x => x !== null).
  		join('&')

  	let _url = `${url}meraki-quotes/index`

  	if (_.isString(options) && options !== ""){
  		_url = `${_url}?${options}`
  	}

  	return ajaxObs({
  		url: _url
  	})
  }

  const merakiQuotesGetObs = (ID) => 
  	ajaxObs({
  		url: `${url}meraki-quotes/${ID}`
  	})

  const merakiQuotesUpdateObs = quote =>
  	ajaxObs({
  		url: `${url}meraki-quotes/update`,
  		method: PUT,
  		body: JSON.stringify({quote})
  	})

	// ------- //
	// HELPERS //
  // ------- //
  const helpersUserPermissionsIndexObs = () =>
  	ajaxObs({
  		url: `${url}helpers/user-permissions`,
  	})

  const helpersUserPermissionsUpdateObs = (permission) =>
  	ajaxObs({
  		url: `${url}helpers/user-permissions`,
  		method: PUT,
  		body: JSON.stringify({permission})
  	})

	return {
		// SESSION
		sessionLoginObs,
		// USERS
		userCreateObs,
		usersIndexObs,
		userShowObs,
		userPermissionsIndexObs,
		userPermissionsUpdateObs,
		userVerificationObs,
		userChangePasswordObs,
		// MERAKI DEVICES
		merakiDevicesIndexObs,
		merakiDevicesCreateObs,
		merakiDevicesDestroyObs,
		merakiDevicesGetAllObs,
		// MERAKI QUOTES
		merakiQuotesCreateObs,
		merakiQuotesUpdateObs,
		merakiQuotesIndexObs,
		merakiQuotesGetObs,
		// HELPERS
		helpersUserPermissionsIndexObs,
		helpersUserPermissionsUpdateObs
	}
}

export default new AwsApiObservers()