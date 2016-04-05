var csv = require('fast-csv')
var MerakiDevice = require('../models/merakiDevices.model.js')

csv.
	fromPath(process.argv[2], {headers: ["PartNumber", "Category", "Description", "Price"]}).
	on('data', data => {
		data.Price = parseInt(data.Price)
		MerakiDevice.create(data, function(err, result){
			if (err)
				return console.log(err)
			console.log(result)
		})
	}).
	on('end', () => {
		console.log("\nDone")
	})