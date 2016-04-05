console.log('Loading function...')

var MerakiDevice = require('./merakiDevices.model.js')

exports.handler = function(event, context){
	console.log('Creating element')

	var device = {
		PartNumber  : event.PartNumber,
		Category    : event.Category,
		Description : event.Description,
		Price       : +event.Price,
		ImageUrl    : event.ImageUrl
	}

	MerakiDevice.create(device, function(err, acc){
		if (err) {
			console.log('Element creation failed. ' + err)
			context.fail(err)
			return
		}

		console.log('Element created successfuly')
		context.succeed(acc)
	})
}