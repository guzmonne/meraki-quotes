var vogels = require('vogels'),
    Joi    = require('joi')

var User = vogels.define('User', {
	hashKey   : 'email',
	timestamps: true,
	tableName : 'ConappsUsers',
	schema    : {
		ID          : vogels.types.uuid(),
		email       : Joi.string().email(),
		passwordHash: Joi.string(),
		passwordSalt: Joi.string(),
		permissions : Joi.array().
			includes(Joi.string()),
		username   : Joi.string(),
		verified   : Joi.boolean().default(true),
		verifyToken: Joi.string()
	}
})

module.exports = User