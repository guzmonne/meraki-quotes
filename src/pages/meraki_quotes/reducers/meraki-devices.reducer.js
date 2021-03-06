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
	MERAKI_DEVICES_DESTROY_ERROR,
	SET_MERAKI_DEVICES_PAGE_SIZE,
	SET_MERAKI_DEVICES_QUERY_STRING,
	DOING_MERAKI_DEVICES_GETALL,
	MERAKI_DEVICES_GETALL_SUCCESS,
	MERAKI_DEVICES_GETALL_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection                      : [],
	all                             : [],
	isGettingMerakiDevices          : false,
	error                           : null,
	priceListDiscount               : 1,
	isShowingMerakiDeviceCreateModal: false,
	selectedDevices                 : [],
	current                         : null,
	pagination                      : [null],
	page                            : 0,
	total                           : 0,
	pageSize                        : 10,
	queryString                     : "",
	count                           : 0
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
				{selectedDevices: []},
				{collection: action.collection},
				{pagination: action.pagination},
				{page: action.page},
				{total: action.total},
				{count: action.count}
			)
		case MERAKI_DEVICES_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error},
				{isGettingMerakiDevices: false}
			)
		case SELECT_MERAKI_DEVICES_PRICE_LIST:
			return Object.assign(
				{},
				state,
				{priceListDiscount: action.discount}
			)
		case TOGGLE_MERAKI_DEVICES_CREATE_MODAL:
			return Object.assign(
				{},
				state,
				{isShowingMerakiDeviceCreateModal: !state.isShowingMerakiDeviceCreateModal}
			)
		case MERAKI_DEVICES_CREATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{collection: !state.collection.find(x => x.PartNumber === action.model.PartNumber) ? 
					[action.model, ...state.collection]
					:
					state.collection.map(x => x.PartNumber === action.model.PartNumber ? 
						action.model : x
					)	
				},
				{error: null},
				{isShowingMerakiDeviceCreateModal: false}
			)
		case MERAKI_DEVICES_CREATE_ERROR: {
			return Object.assign(
				{},
				state,
				{collection: state.collection.filter(x => x.PartNumber !== action.partNumber)},
				{error: action.error},
				{isShowingMerakiDeviceCreateModal: false}
			)
		}
		case SELECT_MERAKI_DEVICE:
			return Object.assign(
				{},
				state,
				{selectedDevices: action.selectedDevices}
			)
		case SET_CURRENT_MERAKI_DEVICE:
			return Object.assign(
				{},
				state,
				{current: action.current}
			)
		case MERAKI_DEVICES_DESTROY:
			return Object.assign(
				{},
				state,
				{selectedDevices: []},
				{error: null},
				{collection: state.collection.filter(x => state.selectedDevices.indexOf(x.PartNumber) === -1)}
			)
		case MERAKI_DEVICES_DESTROY_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error},
				{collection: action.collection}
			)
		case SET_MERAKI_DEVICES_PAGE_SIZE:
			return Object.assign(
				{}, 
				state,
				{pageSize: action.pageSize}
			)
		case SET_MERAKI_DEVICES_QUERY_STRING:
			return Object.assign(
				{},
				state,
				{queryString: action.queryString}
			)
		//////////////////////////////////////
		/// MERAKI DEVICE GET ALL
		//////////////////////////////////////
		case DOING_MERAKI_DEVICES_GETALL:
			return Object.assign(
				{},
				state,
				{doingMerakiDevicesGetAll: true}
			)
		case MERAKI_DEVICES_GETALL_SUCCESS:
			return Object.assign(
				{},
				state,
				{doingMerakiDevicesGetAll: false},
				{error: null},
				{all: action.collection}
			)
		case MERAKI_DEVICES_GETALL_ERROR:
			return Object.assign(
				{},
				state,
				{doingMerakiDevicesGetAll: false},
				{error: action.error}
			)
		default:
			return state
	}
}