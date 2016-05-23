console.log('Loading custom modules...')
const Helpers = require('./helpers.model.js')

function updateUserPermissions(values, fn){
	Helpers.update({helperName: 'UserPermissions', values: values}, fn)
}

function getUserPermissions(fn){
	Helpers.get('UserPermissions', fn)
}

exports.handler = function(event, context, callback){
	const permission = event.permission
	console.log('Updating User Permissions')
	getUserPermissions(function(err, permissions){
		if (err) {
			console.log('Error while getting permissions')
			callback(err)
			return
		}
		console.log('User permissions gotten')
		console.log(permissions)
		updateUserPermissions(permissions.get('values').concat(permission) /* New Values */, function(err, result){
			if (err) {
				console.log('Error while updating permissions')
				callback(err)
				return
			}
			console.log('User permissions updated')
			return callback(null, result)
		})
	})
}