var vogels = require('vogels'),
    Joi    = require('joi');

var Counts = vogels.define('Counts', {
	hashKey: 'table',
	timestamps: true,
	tableName: 'ConappsCounts',
	schema: {
		table: Joi.string(),
		count: Joi.number()
	}
})

module.exports = Counts