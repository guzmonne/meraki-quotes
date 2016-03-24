import signupReducer from '../pages/main/reducers/signup.reducer.js'

export default function mainReducer(state={}, action){
	return {
		signup: signupReducer(state.signup, action)
	}
}