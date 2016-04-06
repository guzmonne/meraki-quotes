var vogels = require('vogels'),
    Joi    = require('joi');

// Remove comment before calling a script
vogels.AWS.config.update({region: "us-east-1"})

var MerakiDevice = vogels.define('MerakiDevice', {
	hashKey: 'Category',
	rangeKey: 'PartNumber',
	timestamps: true,
	tableName: 'ConappsMerakiDevices',
	schema: {
		ID: vogels.types.uuid(),
		PartNumber: Joi.string(),
		Category: Joi.string(),
		Description: Joi.string(),
		ImageUrl: Joi.string(),
		Price: Joi.number()
	}
})

module.exports = MerakiDevice