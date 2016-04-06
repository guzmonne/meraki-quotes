var async  = require('async')
var _      = require('lodash')

var Counts = require('./counts.model.js')

exports.handler = function(event, context){
	console.log('Getting MerakiDevices Count')

	if (!event.Records && !_.isArray(event.Records))
		return context.done()
		
	var recordFunctions = event.Records.
		map(function(record){
			return function(callback){
				var step = 0

				if (record.eventName === 'INSERT') step = 1
				if (record.eventName === 'REMOVE') step = -1

				Counts.update({table: 'ConappsMerakiDevices', count: {$add: (parseInt(step) || 0)}}, function(err, data){
					if (err){
						var errorMessage = 'Error while getting the count' + JSON.stringify(err)
						console.log(errorMessage)
						return callback(errorMessage, null)
					}

					console.log('OK!')
					callback(null, data)
				})
			}
		})

	console.log(JSON.stringify(recordFunctions), async.parallel)
	
	async.parallel(recordFunctions, function(err, data){
		if (err) {
			console.log('Error: ' + JSON.stringify(err))
			context.fail(err)
		} else {
			console.log('Success')
			context.succeed(data)
		}
	})	
}