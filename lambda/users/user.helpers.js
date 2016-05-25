var crypto = require('crypto')
var User   = require('./user.model.js')

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

function computeHash(password, salt, fn) {
	// Bytesize
	var len = 128;
	var iterations = 4096;

	if (3 == arguments.length) {
		crypto.pbkdf2(password, salt, iterations, len, function(err, derivedKey) {
			if (err) return fn(err);
			else fn(null, salt, derivedKey.toString('base64'));
		});
	} else {
		fn = salt;
		crypto.randomBytes(len, function(err, salt) {
			if (err) return fn(err);
			salt = salt.toString('base64');
			computeHash(password, salt, fn);
		});
	}
}

module.exports = Object.freeze({
	getUser    : getUser,
	computeHash: computeHash,
})