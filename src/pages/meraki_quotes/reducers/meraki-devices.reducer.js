import {
	DOING_MERAKI_DEVICES_INDEX,
	MERAKI_DEVICES_INDEX_SUCCESS,
	MERAKI_DEVICES_INDEX_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection: [],
	isGettingMerakiDevices: false,
	error: null,
	paginationKey: null
}

export default function merakiDevicesReducer(state=defaultState, action){
	switch(action.type){
		case DOING_MERAKI_DEVICES_INDEX:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiDevices: true}
			)
		case MERAKI_DEVICES_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiDevices: false},
				{collection: action.data.Items},
				{paginationKey: action.data.LastEvaluatedKey}
			)
		case MERAKI_DEVICES_INDEX_ERROR:
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