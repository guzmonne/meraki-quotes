console.log('Loading models')
var User    = require('./user.model.js')
var getUser = require('./user.helpers.js').getUser

exports.handler = function(event, context, callback){
	const email = event.email
	const verifyToken = event.verifyToken

	getUser(email, function(err, user){
		if(err) {
			callback(err)
			return
		}
		console.log('User found')
		const verified            = user.get('verified')
		const storedVerifiedToken =  user.get('verifyToken')
		if(!!verified){
			console.log('User already verified ' + email)
			callback(null, {verified: true})
			return
		}
		if (verifyToken === storedVerifiedToken){
			console.log('Verification token match. Updating user.')
			User.update({email: user.get('email'), verified: true}, function(err, data){
				if (err) {
					callback(err)
					return
				}
				console.log('User verified')
				callback(null, {verified: true})
			})
		}
	})
}