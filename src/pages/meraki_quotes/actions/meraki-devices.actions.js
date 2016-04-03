import {
	DOING_MERAKI_DEVICES_INDEX,
	MERAKI_DEVICES_INDEX_SUCCESS,
	MERAKI_DEVICES_INDEX_ERROR,
	SELECT_MERAKI_DEVICES_PRICE_LIST,
	TOGGLE_MERAKI_DEVICES_CREATE_MODAL,
	MERAKI_DEVICES_CREATE_SUCCESS,
	MERAKI_DEVICES_CREATE_ERROR
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

export function doMerakiDevicesCreate(model){
	if (!model || !model.PartNumber || !model.Category) return
	return dispatch => {
		dispatch(merakiDevicesCreateSuccess(model))

		AwsApiObservers.
			merakiDevicesCreateObs(model).
			subscribe(
				() => console.log('Model created successfully'),
				error => dispatch(merakiDevicesCreateError(error, model.PartNumber))
			)
	}
}

export function toggleMerakiDevicesCreateModal(){
	return {
		type: TOGGLE_MERAKI_DEVICES_CREATE_MODAL
	}
}

export function selectMerakiDevicesPriceList(discount){
	return {
		type: SELECT_MERAKI_DEVICES_PRICE_LIST,
		discount
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

function merakiDevicesCreateSuccess(model){
	return {
		type: MERAKI_DEVICES_CREATE_SUCCESS,
		model
	}
}

function merakiDevicesIndexError(error){
	return {
		type: MERAKI_DEVICES_INDEX_ERROR,
		error
	}
}

function merakiDevicesCreateError(error, partNumber){
	return {
		type: MERAKI_DEVICES_CREATE_ERROR,
		error,
		partNumber
	}
}