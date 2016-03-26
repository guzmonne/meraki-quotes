import signupReducer from '../pages/main/reducers/signup.reducer.js'
import loginReducer from '../pages/main/reducers/login.reducer.js'
import merakiDevicesReducer from '../pages/meraki_quotes/reducers/meraki-devices.reducer.js'

export default function mainReducer(state={}, action){
	return {
		signup: signupReducer(state.signup, action),
		login: loginReducer(state.login, action),
		merakiDevices: merakiDevicesReducer(state.merakiDevices, action)
	}
}