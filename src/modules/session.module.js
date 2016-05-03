const Session = {

	logout(message){
		delete localStorage.token
		location.href = `/login?Message=${encodeURI(message)}`
	}

}

export default Session