console.log('Loading custom modules...')
const Helpers = require('./helpers.model.js')

function getUserPermissions(fn){
	Helpers.get('UserPermissions', fn)
}

exports.handler = function(event, context, callback){
	console.log('Getting User Permissions')
	getUserPermissions(function(err, result){
		if (err) {
			console.log('Error while getting permissions')
			callback(err)
			return
		}
		console.log('User permissions gotten')
		return callback(null, result)
	})
}