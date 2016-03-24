import {
	DOING_SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	user: null,
	isSigningUp: false,
	signupFormError: {},
	message: null
}

export default function signupReducer(state=defaultState, action){
	switch(action.type){
		case DOING_SIGNUP_USER:
			return Object.assign(
				{},
				defaultState,
				{isSigningUp: true}
			)
		case SIGNUP_USER_SUCCESS:
			return Object.assign(
				{}, 
				defaultState,
				{user: action.user},
				{message: 'El usuario se ha creado con éxito.'}
			)
		case SIGNUP_USER_ERROR:
			return Object.assign(
				{},
				defaultState,
				{signupFormError: action.error}
			)
		default:
			return state
	}
}