import {
	DOING_GET_MERAKI_DEVICES,
	GET_MERAKI_DEVICES_SUCCESS,
	GET_MERAKI_DEVICES_ERROR
} from '../../../state/action-types.js'

// getMerakiDevices
export function getMerakiDevices(){
	return (dispatch, getState) => {
		const lambda = new AWS.Lambda()
		const handleSuccess = data => dispatch(getMerakiDevicesSuccess(data))
		const handleError = error => dispatch(getMerakiDevicesError(error))

		dispatch(doingGetMerakiDevices())

		lambda.invoke({
			FunctionName: 'conapps-get-meraki-devices'
		}, (err, data) => {
			if (err) return handleError(err)
			const output = JSON.parse(data)
			handleSuccess(output)
		})
	}
}

function doingGetMerakiDevices(){
	return {
		type: DOING_GET_MERAKI_DEVICES
	}
}

function getMerakiDevicesSuccess(data){
	return {
		type: GET_MERAKI_DEVICES_SUCCESS,
		data
	}
}

function getMerakiDevicesError(error){
	return {
		type: GET_MERAKI_DEVICES_ERROR,
		error
	}
}