var vogels = require('vogels'),
    Joi    = require('joi');

var MerakiDevice = vogels.define('MerakiDevice', {
	hashKey: 'PartNumber',
	rangeKey: 'Category',
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