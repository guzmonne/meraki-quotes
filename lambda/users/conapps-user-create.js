console.log('Loading modules...')
var AWS    = require('aws-sdk')
var crypto = require('crypto')

console.log('Loading models...')
var User = require('./user.model.js')

console.log('Constructing the SES service...')
var SES = new AWS.SES()

function sendVerificationEmail(email, password, token, fn) {
	const subject = 'Email de verificación para ConApps.com'
	const verificationLink = 'http://localhost:3000/activate_account?email=' +
		encodeURIComponent(email) + '&verify=' + token
	SES.sendEmail({
		Source: 'no-reply@conapps.click',
		Destination: {
			ToAddresses: [email]
		},
		Message: {
			Subject: {
				Data: subject
			},
			Body: {
				Html: {
					Data: `
						<html>
							<head>
								<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
								<title>${subject}</title>
							</head>
							<body>
								<h1>¡Bienvenido a ConApps!</h1>
								<br />
								<p>Por favor acceda al siguiente link para habilitar su cuenta:</p>
								<br />
								<p><a href="${verificationLink}">${verificationLink}</a></p>
								<br />
								<br />
								<p>Sus credenciales de acceso son las siguientes:</p>
								<p>
									<dt>Usuario:</dt>
									<dd>${email}</dd>
									<dt>Contraseña:</dt>
									<dd>${password}</dd>
								</p>
								<br />
								<p>Procure cambiar esta contraseña cuanto antes.</p>
								<br />
								<p>Muchas Gracias</p>
								<p>--</p>
								<p>Administradores de Conapps</p>
							</body>
						</html>
					`
				}
			}
		}
	}, fn)
}

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
  		verified    : false,
			verifyToken : token,
			permissions : []
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

exports.handler = function(event, context, callback){
	var email         = event.email
	var clearPassword = event.password
	var username      = event.username

	console.log('Computing hash...')
	computeHash(clearPassword, function(err, salt, hash){
		if (err){
			var errorMessage = 'Error creating hash: ' + err
			console.log(errorMessage)
			callback(errorMessage)
			return
		}
		console.log('Storing user...')
		storeUser(email, hash, salt, username, function(err, token){
			if (err){
				console.log('Error in storeUser()' + err)
				callback(null, {
					created     : false,
					errorMessage: 'Usuario existente'
				})
				return
			}
			console.log('Sending verification email...')
			sendVerificationEmail(email, clearPassword, token, function(err){
				if (err) {
					console.log('Error al verificar el correo')
					callback(err)
				}
				console.log('Mail enviado con exito.')
				callback(null, {created: true})
			})
		})
	})
}