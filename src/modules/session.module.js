const Session = {

	logout(message){
		console.log(message)
		delete localStorage.token
		location.href = `/login?Message=${encodeURI(message)}`
	}

}

export default Session