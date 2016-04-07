var uuid = require('node-uuid')
var nJwt  = require('njwt')

var secretKey = uuid.v4()

var claims = {
	sub: (new Date()).getDate(),
	iss: 'http://localhost:3000',
	permissions: ['users-index', 'user-create']
}

var jwt = nJwt.create(claims, secretKey)

console.log(JSON.stringify(jwt))
console.log(jwt.compact(), secretKey)

