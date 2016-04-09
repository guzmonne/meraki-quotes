console.log('Loading modules...')
var nJwt    = require('njwt')
console.log('Loading models')
var Session = require('./session.model.js')

var generatePolicy = function(principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
		var policyDocument          = {};
		policyDocument.Version      = '2012-10-17'; // default version
		policyDocument.Statement    = [];
		var statementOne            = {};
		statementOne.Action         = 'execute-api:Invoke'; // default action
		statementOne.Effect         = effect;
		statementOne.Resource       = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

exports.handler = function(event, context){
	
	var token = event.authorizationToken.split(' ')

	if (token[0] !== 'Bearer'){
		console.log('Invalid authorizationToken. No "Bearer".')
		context.succeed(generatePolicy('user', 'Deny', event.methodArn));
		return
	}

	var tokenArray = token[1].split('.')

	if (tokenArray.length !== 3){
		console.log('Invalid authorizationToken. Wrong split length.')
		context.succeed(generatePolicy('user', 'Deny', event.methodArn));
		return
	}

	var body = JSON.parse(new Buffer(tokenArray[1], 'base64').toString("ascii"))

	if (!body.jti){
		console.log('Invalid authorizationToken. No jti value found.')
		context.succeed(generatePolicy('user', 'Deny', event.methodArn));
		return
	}

	Session.get(body.jti, function(err, data){
		if (err) {
 			console.log('Session not found' + err)
			context.succeed(generatePolicy('user', 'Deny', event.methodArn));
 			return
		}

		nJwt.verify(token[1], data.get('key'), function(err, verifiedJwt){
			if (err) {
				console.log('Unverified token' + err)
				context.succeed(generatePolicy('user', 'Deny', event.methodArn));
				return
			}
			console.log('Success!')
			context.succeed(generatePolicy(body.jti, 'Allow', event.methodArn));
		})
	})
}