console.log('Loading modules...')
var AWS    = require('aws-sdk')

console.log('Loading custom modules...')
var User    = require('./user.model.js')
var Helpers = require('./user.helpers.js')

console.log('Constructing the SES service...')
var SES = new AWS.SES()

function sendChangePasswordEmail(email, fn){
	const subject = 'CONAPPS - Cambio de Contraseña'
	SES.sendEmail({
		Source: 'no-reply@conapps.click',
		Destination: {ToAddresses: [email]},
		Message: {
			Subject: {Data: subject},
			Body: {
				Html: {
					Data: `
						<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title>${subject}</title>
</head>
<body>
	<h1>CONAPPS - Contraseña actualizada correctamente</h1>
	<br />
	<p><a href="https://www.conapps.click">Acceder a CONAPPS</a></p>
	<br />
	<br />
	<p>Contacte con el <a mailto="aws@conatel.com.uy">Administrador</a> del sistema por cualquier inconveniente.</p>
	<br />
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

exports.handler = function(event, context, callback){
	const email         = event.email
	const clearPassword = event.clearPassword
	const newPassword   = event.newPassword

	console.log('Getting user')
	Helpers.getUser(email, function(err, user){
		if (err) {
			console.log(err)
			callback(err)
			return
		}
		if (user === null) {
			callback('User not found')
			return
		}
		Helpers.computeHash(clearPassword, user.get('passwordSalt'), function(err, salt, hash){
			if (err) {
				console.log(err)
				callback(err)
				return
			}
			if (hash == user.get('passwordHash')) {
				console.log('User authenticated with old password')
				Helpers.computeHash(newPassword, function(err, newSalt, newHash){
					User.update(Object.assign({}, {
						email       : user.get('email'),
						passwordSalt: newSalt,
						passwordHash: newHash
					}), function(err, data){
						if (err) {
							console.log(err)
							callback(err)
							return
						}
						console.log('Password updated successfully')
						sendChangePasswordEmail(user.get('email'), function(err){
							if (err) {
								console.log(err)
								callback(err)
								return
							}
							console.log('Change email password')
							callback(null)
						})
					})
				})
			}
		})
	})
}