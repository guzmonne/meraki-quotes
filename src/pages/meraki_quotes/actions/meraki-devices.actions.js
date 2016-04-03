import {
	DOING_MERAKI_DEVICES_INDEX,
	MERAKI_DEVICES_INDEX_SUCCESS,
	MERAKI_DEVICES_INDEX_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

// getMerakiDevices
export function merakiDevicesIndex(){
	return (dispatch, getState) => {
		const handleSuccess = data => dispatch(merakiDevicesIndexSuccess(data))
		const handleError = error => dispatch(merakiDevicesIndexError(error))
		const paginationKey = getState().merakiDevices.paginationKey

		dispatch(doingMerakiDevicesIndex())

		AwsApiObservers.
			merakiDevicesIndexObs(paginationKey).
			subscribe(
				({response}) => {console.log(response); handleSuccess(response)},
				error => handleError(error)
			)
	}
}

function doingMerakiDevicesIndex(){
	return {
		type: DOING_MERAKI_DEVICES_INDEX
	}
}

function merakiDevicesIndexSuccess(data){
	return {
		type: MERAKI_DEVICES_INDEX_SUCCESS,
		data
	}
}

function merakiDevicesIndexError(error){
	return {
		type: MERAKI_DEVICES_INDEX_ERROR,
		error
	}
}