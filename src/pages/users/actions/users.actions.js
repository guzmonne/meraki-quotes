import {
	DOING_USERS_INDEX,
	USERS_INDEX_SUCCESS,
	USERS_INDEX_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

export function doUsersIndex() {
	return (dispatch, getState) => {
		const handleSuccess = response => dispatch(usersIndexSuccess(response))
		const handleError = response => dispatch(usersIndexError(response))

		dispatch(doingUsersIndex())

		AwsApiObservers.
			usersIndexObs().
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError(error)
			)
	}
}

export function doingUsersIndex() {
	return {
		type: DOING_USERS_INDEX
	}
}

export function usersIndexSuccess(response) {
	return {
		type: USERS_INDEX_SUCCESS,
		response
	}
}

export function usersIndexError(error) {
	return {
		type: USERS_INDEX_ERROR,
		error
	}
}