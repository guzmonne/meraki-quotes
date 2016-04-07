console.log('Loading modules...')
var crypto  = require('crypto')
var uuid    = require('node-uuid')
var nJwt    = require('njwt')
console.log('Loading models')
var Session = require('./session.model.js')
var User    = require('./user.model.js')

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

function generateToken(user, fn){
	var secretKey = uuid.v4()
	var claims = {
		sub: user.get('ID'),
		iss: 'http://conapps.click',
		permissions: user.get('permissions')
	}
	var jwt = nJwt.create(claims, secretKey)
	Session.create({
		jti: jwt.body.jti,
		key: secretKey
	}, function(err, data){
		if (err){
			console.log('Session create() error')
			return fn(err)
		}
		console.log('Session saved correctly')
		fn(null, jwt)
	})
}

exports.handler = function(event, context){
	var email         = event.email
	var clearPassword = event.password

	getUser(email, function(err, user){
		if (err) {
			console.log(err)
			context.fail('Error getting user' + err)
			return
		}
		if (user === null){
			context.succeed({login: false})
			return
		}
		// TODO:
		// Implement 'verified' field verification
		computeHash(clearPassword, user.get('passwordSalt'), function(err, salt, hash){
			if (err){
				console.log(err)
				context.fail('Error in hash: ' + err)
				return
			}
			if (hash == user.get('passwordHash')){
				console.log('User logged in: ' + user.get('email'))
				generateToken(user, function(err, jwt){
					if (err){
						console.log(err)
						context.fail('Error in generateToken: ' + err)
						return
					}
					context.succeed({
						login: true,
						token: jwt.compact()
					})
				})
			}
		})
	})
}

