var vogels = require('vogels'),
    Joi    = require('joi');

var Session = vogels.define('Session', {
	hashKey: 'jti',
	timestamps: true,
	tableName: 'ConappsSessions',
	schema: {
		jti: Joi.string(),
		key: Joi.string()
	}
})

module.exports = Session