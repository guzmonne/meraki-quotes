var User    = require('./user.model.js')

function getUser(email, fn){
	console.log('Getting a user with email: ' + email)
	User.get(email, function(err, user){
		if (err) {
			console.log('User get() error')
			return fn(err)
		}
		if (user.get('email')) {
			console.log('User found')
			fn(null, user)
		} else {
			console.log('User not found');
			fn(null, null)
		}
	})
}

module.exports = Object.freeze({
	getUser: getUser
})