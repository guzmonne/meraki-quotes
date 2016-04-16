var vogels = require('vogels'),
    Joi    = require('joi');

// Remove comment before calling a script
//vogels.AWS.config.update({region: "us-east-1"})

var MerakiQuote = vogels.define('MerakiQuote', {
	hashKey: 'UserID',
	rangeKey: 'createdAt',
	timestamps: true,
	tableName: 'ConappsMerakiQuotes',
	schema: {
		ID: vogels.types.uuid(),
		UserID: Joi.string(),
		UserName: Joi.string(),
		Name: Joi.string(),
		Description: Joi.string(),
		Devices: Joi.array(),
		Discount: Joi.number(),
		DealApproved: Joi.boolean(),
		SoftwareMargin: Joi.number(),
		HardwareMargin: Joi.number(),
		ServiceMargin: Joi.number(),
		AdminMargin: Joi.number(),
		ServiceLevel: Joi.string().regex(/(^9x5xNBD$|^24x7x4$)/),
		LicenceYears: Joi.number(),
		SharedWith: Joi.array()
	},
	indexes: [
		{
			hashKey: 'ID',
			name: 'IDIndex',
			type: 'global'
		}
	]
})

module.exports = MerakiQuote