var csv = require('fast-csv')
var async = require('async')

var MerakiDevice = require('../models/merakiDevices.model.js')

var functions = [] 

csv.
	fromPath(process.argv[2], {headers: ["PartNumber", "Category", "Description", "Price"]}).
	on('data', data => {
		data.Price = parseInt(data.Price)
		
		functions.push(function(callback){
			setTimeout(function(){
				MerakiDevice.create(data, function(err, result){
					if (err){
						console.log(err)
						return callback(err, null)
					}
					console.log(result.attrs)
					return callback(null, result.attrs)
				})
			}, 500)
		})

	}).
	on('end', () => {
		async.series(functions, function(err, results){
			if (err)
				console.error(err)
			else
				console.log(results)
		})
	})