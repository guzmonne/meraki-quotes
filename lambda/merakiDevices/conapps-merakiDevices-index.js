var vogels = require('vogels'),
    Joi    = require('joi'),
    async  = require('async');

var MerakiDevice = require('./merakiDevices.model.js')
var Counts       = require('./counts.model.js')

function fetchMerakiDevices(callback){
	console.log('Fetching Meraki Devices')

	var query = MerakiDevice.
		scan().
		limit(10)
		
	console.log('Checking if paginationKey is defined')
	if (!!this.paginationKey && this.paginationKey !== "") {
		console.log('paginationKey = ' + this.paginationKey)
		query =	query.startKey(this.paginationKey)
	}

	console.log('Executing merakiDevices scan')
	query.
		exec(function(err, data){
			if (err){
				console.log('Error while fetching MerakiDevices')
				callback(err, null)
				return
			}

			console.log('Success while fetching MerakiDevices')
			callback(null, data)
		})
}

function fetchMerakiDevicesCount(callback){
	console.log('Executing count get')
	Counts.
		get('ConappsMerakiDevices', {
			AttributesToGet: ['count']
		}, function(err, data){
			if (err){
				console.log('Error while fetching ConappsMerakiDevices count')
				callback(err, null)
				return
			}

			console.log('Success while fetching ConappsMerakiDevices count')
			callback(null, data)
		})
}

exports.handler = function(event, context){
	var paginationKey = event.paginationKey

	async.
		parallel([
			fetchMerakiDevices.bind({paginationKey: paginationKey}),
			fetchMerakiDevicesCount
		], function(err, results){
			if (err){
				console.log('Error detected on asyn: ' + err)
				context.fail(err)
				return
			}

			console.log('Async parallel calls successful')
			var merakiDevices = results[0]
			var count = results[1]

			merakiDevices.Total = count;

			context.succeed(merakiDevices)
		})
}