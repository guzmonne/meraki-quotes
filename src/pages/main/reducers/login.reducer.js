import {
	DOING_LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	user: null,
	error: null,
	isLoggingIn: false
}

export default function loginReducer(state=defaultState, action){
	switch(action.type){
		case DOING_LOGIN_USER:
			return Object.assign(
				{},
				defaultState,
				{isLoggingIn: true}
			)
		case LOGIN_USER_SUCCESS:
			return Object.assign(
				{}, 
				defaultState
			)
		case LOGIN_USER_ERROR:
			return Object.assign(
				{},
				defaultState,
				{error: action.error}
			)
		default:
			return state
	}
}