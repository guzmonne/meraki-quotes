import {
	DOING_MERAKI_DEVICES_INDEX,
	MERAKI_DEVICES_INDEX_SUCCESS,
	MERAKI_DEVICES_INDEX_ERROR,
	SELECT_MERAKI_DEVICES_PRICE_LIST,
	TOGGLE_MERAKI_DEVICES_CREATE_MODAL,
	MERAKI_DEVICES_CREATE_SUCCESS,
	MERAKI_DEVICES_CREATE_ERROR,
	SELECT_MERAKI_DEVICE,
	SET_CURRENT_MERAKI_DEVICE,
	MERAKI_DEVICES_DESTROY,
	MERAKI_DEVICES_DESTROY_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'
import ActionHelpers from '../../../modules/action-helpers.module.js'

// getMerakiDevices
export function merakiDevicesIndex(turnPage=0){
	return (dispatch, getState) => {
		// [null]
		// Opciones: -1, 0, 1
		// -1 -> null -> A -> [null, A]
		//                     ^
		//  0 -> null -> A -> [null, A]
		//                     ^
		//  1 -> A    -> B -> [null, A, B]
		//                           ^
		// -------------------------------                    
		// [null, A, B]
		// Opciones: -1, 0, 1
		// -1 -> null -> A -> [null, A, B] ~ [null, A]
		//                      ^              ^
		//  0 -> A    -> B -> [null, A, B]
		//                           ^
		//  1 -> B    -> C -> [null, A, B, C]
		//                              ^
		// ----------------------------------
		// [null, A, B] ~ [A, B, C]                                                                                     
		//        ^           ^
		const handleSuccess = (...args) => dispatch(merakiDevicesIndexSuccess(...args))
		const handleError = error => dispatch(merakiDevicesIndexError(error))
		
		const {pagination, page} = getState().merakiDevices
		const paginationKey = pagination[page + turnPage < 0 ? 0 : page + turnPage];

		dispatch(doingMerakiDevicesIndex())

		AwsApiObservers.
			merakiDevicesIndexObs(paginationKey).
			subscribe(
				({response}) => {
					const {Items, LastEvaluatedKey, Total} = response
					if (turnPage === -1)
						return handleSuccess(Items, (page - 1 < 0 ? 0 : page - 1), (pagination.length < 2 ? [null, LastEvaluatedKey] : pagination), Total.count)
					if (turnPage ===  0)
						return handleSuccess(Items, page, (pagination.length < 2 ? [null, LastEvaluatedKey] : pagination), Total.count)
					if (turnPage ===  1)
						return handleSuccess(Items, page + 1, (!!LastEvaluatedKey ? [...pagination, LastEvaluatedKey] : pagination), Total.count)
				},
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
				({response}) => !!response.errorMessage ? 
					dispatch(merakiDevicesCreateError(response.errorMessage, model.PartNumber)) : null,
				error => dispatch(merakiDevicesCreateError(error, model.PartNumber))
			)
	}
}

export function doSetCurrentMerakiDevice(isNew=true){
	return (dispatch, getState) => {
		let current = null
		if (isNew === false){
			const merakiDevices = getState().merakiDevices
			const partNumber = merakiDevices.selectedDevices[0]
			current = merakiDevices.collection.
				find(x => x.PartNumber === partNumber) 
		} 
		dispatch(setCurrentMerakiDevice(current))
	}
}

export function doSelectMerakiDevice(device){
	return (dispatch, getState) => {
		const selectedDevices = getState().merakiDevices.selectedDevices

		if (selectedDevices.indexOf(device) === -1)
			dispatch(selectMerakiDevice([...selectedDevices, device]))
		else
			dispatch(selectMerakiDevice(selectedDevices.filter(x => x !== device)))
	}
}

export function doMerakiDevicesDestroy(){
	return (dispatch, getState) => {
		const merakiDevices = getState().merakiDevices
		const {collection, selectedDevices} = merakiDevices
		const clonedCollection = [...collection]

		dispatch(merakiDevicesDestroy())

		const selectedDevicesPairs = collection.
			reduce((acc, x) => {
				return selectedDevices.indexOf(x.PartNumber) > -1 ? [...acc, x] : acc
			}, []).
			map(({PartNumber, Category}) => ({PartNumber, Category}))

		AwsApiObservers.
			merakiDevicesDestroyObs(selectedDevicesPairs).
			subscribe(
				response => console.log(response),
				error => dispatch(merakiDevicesDestroyError(error, clonedCollection)),
				() => console.log(selectedDevicesPairs)
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

function selectMerakiDevice(selectedDevices){
	return {
		type: SELECT_MERAKI_DEVICE,
		selectedDevices
	}
}

function setCurrentMerakiDevice(current){
	return {
		type: SET_CURRENT_MERAKI_DEVICE,
		current
	}
}

function doingMerakiDevicesIndex(){
	return {
		type: DOING_MERAKI_DEVICES_INDEX
	}
}

function merakiDevicesIndexSuccess(collection, page, pagination, total){
	return {
		type: MERAKI_DEVICES_INDEX_SUCCESS,
		collection,
		pagination,
		page,
		total
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

function merakiDevicesDestroy(){
	return {
		type: MERAKI_DEVICES_DESTROY
	}
}

function merakiDevicesDestroyError(error, collection){
	return {
		type: MERAKI_DEVICES_DESTROY_ERROR,
		error,
		collection
	}
}