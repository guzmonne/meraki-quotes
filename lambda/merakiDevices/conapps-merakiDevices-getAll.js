console.log('Loading function...')

var MerakiDevice = require('./merakiDevices.model.js')

exports.handler = function(event, context, callback){
	if (!MerakiDevice){
		const msg = 'MerakiDevice not found'
		console.log(msg)
		callback(msg)
	}

	MerakiDevice.
		scan().
		exec((err, data) => {
			if (err){
				const msg = "Error while scanning database "
				console.log(msg + err)
				callback(msg + err)
			}
			return callback(null, data)
		})
}