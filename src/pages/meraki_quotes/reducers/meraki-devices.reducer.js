import {
	DOING_GET_MERAKI_DEVICES,
	GET_MERAKI_DEVICES_SUCCESS,
	GET_MERAKI_DEVICES_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection: [],
	isGettingMerakiDevices: false,
	error: null
}

export default function merakiDevicesReducer(state=defaultState, action){
	switch(action.type){
		case DOING_GET_MERAKI_DEVICES:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiDevices: true}
			)
		case GET_MERAKI_DEVICES_SUCCESS:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiDevices: false},
				{collection: action.data}
			)
		case GET_MERAKI_DEVICES_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error},
				{isGettingMerakiDevices: false}
			)
		default:
			return state
	}
}