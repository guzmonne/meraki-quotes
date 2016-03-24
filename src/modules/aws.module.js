export function awsConfig(output){
	if (!output)
		unAuthConfig()
	else
		authConfig(output)
}

function authConfig(output){
	unAuthConfig()
	const credentials = AWS.config.credentials
	credentials.params.IdentityId = output.IdentityId
	credentials.params.Logins = {
		'login.conapps.click': output.token
	}
	credentials.expired = true
}

function unAuthConfig(){
	AWS.config.region = 'us-east-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'us-east-1:56a9c97c-1034-4b11-bdfa-316403796652',
	});
}