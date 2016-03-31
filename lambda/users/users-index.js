console.log('Loading function')

// dependencies
var AWS = require("aws-sdk")
var DOC = require("dynamodb-doc")

var dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = function(event, context) {
  console.log('Querying for all users')

  var LastEvaluatedKey = event.LastEvaluatedKey
  var usersParams = {
    TableName: 'ConappsUsers',
    ProjectionExpression: 'username, email',
    Limit: 10
  }
  var countsParams = {
    "TableName": "ConappsCounts",
    "Key": {
      table: "ConappsUsers"
    }
  }

  if (!!LastEvaluatedKey)
    params.LastEvaluatedKey = LastEvaluatedKey

  function getUsers(callback) {
    dynamodb.scan(usersParams, callback)
  }

  function getCount(callback) {
    dynamodb.get(countsParams, callback)
  }

  function parallel(functions, callback) {
    var result = [];

    function done(err, data) {
      if (err)
        return callback(err, null)
      this.index || (this.index = 0)
      result[this.index] = data
      if (!!result[0] && !!result[1])
        return callback(null, result)
    }

    functions.
    map(function(fn, i) {
      fn(done.bind({
        index: i
      }))
    })
  }

  parallel([getUsers, getCount], function(err, result) {
    if (err)
      return context.fail('Error al realizar alunas de las consultas. ', JSON.stringify(err, null, 2))
    console.log('Consulta existosa', JSON.stringify(result, null, 2))
    var data = result[0]
    data.Total = parseInt(result[1].Item.count)
    context.succeed(data)
  })
}