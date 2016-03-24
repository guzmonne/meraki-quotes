import signupReducer from '../pages/main/reducers/signup.reducer.js'
import loginReducer from '../pages/main/reducers/login.reducer.js'

export default function mainReducer(state={}, action){
	return {
		signup: signupReducer(state.signup, action),
		login: loginReducer(state.login, action)
	}
}