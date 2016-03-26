export function awsConfig(output, expired){
	if (!output)
		unAuthConfig()
	else
		authConfig(output, expired)
}

function authConfig(output, expired){
	unAuthConfig()
	const credentials = AWS.config.credentials
	credentials.params.IdentityId = output.IdentityId
	credentials.params.Logins = {
		'cognito-identity.amazonaws.com': output.token
	}
	credentials.expired = expired || true

	/*
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   	IdentityPoolId: 'us-east-1:56a9c97c-1034-4b11-bdfa-316403796652',
   	IdentityId: output.IdentityId,
   	Logins: {
    	'cognito-identity.amazonaws.com': output.token
   	}
	});
	*/
}

function unAuthConfig(){
	AWS.config.region = 'us-east-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'us-east-1:56a9c97c-1034-4b11-bdfa-316403796652',
	});
}