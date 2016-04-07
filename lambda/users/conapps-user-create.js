console.log('Loading modules...')
var crypto = require('crypto')

console.log('Loading models...')
var User = require('./user.model.js')

function computeHash(password, callback){
	var len = 128
	var iterations = 4096

	crypto.randomBytes(len, function(err, salt){
		if (err){
			console.log('Error in randomBytes(): ' + err)
			callback(err, null)
			return
		}
		salt = salt.toString('base64')
		crypto.pbkdf2(password, salt, iterations, len, function(err, derivedKey){
			if (err){
				console.log('Error in pbkdf2(): ' + err)
				callback(err, null)
				return
			}
			callback(null, salt, derivedKey.toString('base64'))
		})
	})
}

function storeUser(email, password, salt, username, callback){
	// Bytesize
	var len = 128

	crypto.randomBytes(len, function(err, token){
		if (err){
			console.log('Error on randomBytes() method')
			callback(err, null)
			return
		}
		token = token.toString('hex')
		User.create({
			email       : email,
			username    : username,
			passwordHash: password,
			passwordSalt: salt,
			// TODO:
			// Actually implement the verification functionality
//		verified    : false,
			verifyToken : token
		}, function(err, data){
			if (err) {
				console.log('Error while creating user')
				callback(err, null)
				return
			}
			callback(null, token)
		})
	})
}

exports.handler = function(event, context){
	var email         = event.email
	var clearPassword = event.password
	var username      = event.username

	computeHash(clearPassword, function(err, salt, hash){
		if (err){
			var errorMessage = 'Error creating hash: ' + err
			console.log(errorMessage)
			context.fail(errorMessage)
			return
		}
		storeUser(email, hash, salt, username, function(err, token){
			if (err){
				console.log('Error in storeUser()' + err)
				context.succeed({
					created     : false,
					errorMessage: 'Usuario existente'
				})
				return
			}
			// TODO:
			// Implement sendVerificationToken() functionality
			context.succeed({created: true})
		})
	})
}