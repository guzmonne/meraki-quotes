console.log('Loading function');

// dependencies
var AWS    = require('aws-sdk');

var dynamodb = new AWS.DynamoDB()

function getMerakiDevices(fn) {
	var params = {
	    TableName: 'ConappsMerakiDevices',
	    Select: 'ALL_ATTRIBUTES',
	    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
	};
	dynamodb.scan(params, fn);
}

exports.handler = function(event, context) {
	var email         = event.email;
	var clearPassword = event.password;

	getMerakiDevices(function(err, data){
		if (err) return context.fail('DynamoDB Scan failed ' err)
		context.succeed(data)
	});
}