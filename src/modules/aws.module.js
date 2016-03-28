export function awsConfig(output, expired){
	if (!output)
		unAuthConfig()
	else
		authConfig(output, expired)
}

function authConfig(output, expired){
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'us-east-1:56a9c97c-1034-4b11-bdfa-316403796652',
		IdentityId: output.IdentityId,
		Logins: {
		  'cognito-identity.amazonaws.com': output.token
		}
	});
}

function unAuthConfig(){
	var creds = new AWS.CognitoIdentityCredentials({
	  IdentityPoolId: 'us-east-1:56a9c97c-1034-4b11-bdfa-316403796652'
	})
	 
	AWS.config.update({
	    region: 'us-east-1',
	    credentials: creds
	});
}