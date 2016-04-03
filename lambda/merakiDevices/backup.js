console.log('Loading function')

// dependencies
var AWS = require("aws-sdk")
var DOC = require("dynamodb-doc")

var dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = function(event, context) {
  var LastEvaluatedKey = event.LastEvaluatedKey
  
  var params = {
    TableName: 'MerakiDevices',
    Limit: 10
  }

  if (!!LastEvaluatedKey)
    params.LastEvaluatedKey = LastEvaluatedKey

  var errorMessage = 'Surgio un error en la base de datos.'
    
  dynamodb.scan(usersParams, function(err, data){
    if (err){
        console.log(err)
        return context.fail(errorMessage)
    }
    context
  })
}