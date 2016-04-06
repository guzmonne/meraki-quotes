var async  = require('async');
var _      = require('lodash')

var MerakiDevice = require('./merakiDevices.model.js')
var Counts       = require('./counts.model.js')

function fetchMerakiDevices(callback){
	console.log('Fetching Meraki Devices')

	var pageSize = this.pageSize || 10

	var scan = MerakiDevice.scan()
		
	if (!!this.query){
		console.log('Query = ' + this.query)
		scan = scan.where('PartNumber').contains(this.query)
	} else {
		console.log('PageSize = ' + pageSize)
		scan = scan.limit(pageSize)
	}

		
	console.log('Checking if paginationKey is defined')
	if (!!this.paginationKey &&
				this.paginationKey.PartNumber &&
				this.paginationKey.PartNumber !== "" &&
				this.paginationKey.Category &&
				this.paginationKey.Category !== ""
	) {
		console.log('paginationKey = ' + JSON.stringify(this.paginationKey))
		scan =	scan.startKey(this.paginationKey.Category, this.paginationKey.PartNumber)
	}

	console.log('Executing merakiDevices scan')
	scan.
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
	var paginationKey = {
		PartNumber : event.PartNumber,
		Category   : event.Category
	}
	var pageSize = event.PageSize
	var query    = event.Query 

	async.
		parallel([
			fetchMerakiDevices.bind({
				paginationKey : paginationKey,
				pageSize      : pageSize,
				query         : query
			}),
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
			var _pageSize = (parseInt(pageSize) || 10)
			merakiDevices.Total = count;

			context.succeed(merakiDevices)
		})
}