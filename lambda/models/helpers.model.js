var vogels = require('vogels'),
    Joi    = require('joi');

var Helpers = vogels.define('Helpers', {
	hashKey: 'helperName',
	timestamps: true,
	tableName: 'ConappsHelpers',
	schema: {
		helperName: Joi.string(),
		value: Joi.any()
	}
})

module.exports = Helpers