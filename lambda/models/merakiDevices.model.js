var vogels = require('vogels'),
    Joi    = require('joi');

var MerakiDevice = vogels.define('MerakiDevice', {
	hashKey: 'PartNumber',
	rangeKey: 'Category',
	timestamps: true,
	tableName: 'ConappsMerakiDevices',
	schema: {
		ID: vogels.types.uuid(),
		Desciption: Joi.string(),
		Price: Joi.number()
	}
})

module.exports = MerakiDevice