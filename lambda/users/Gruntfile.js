/**
 * Grunt Uploader for Lambda scripts
 * @author: Guzmán Monné <gmonne@gmail.com>
 */
'use strict'

module.exports = function(grunt){

	require('load-grunt-tasks')(grunt)
	if (grunt.option('account_id') === undefined)
		return grunt.fail.fatal('--account_id is required', 1)

	var path = require('path')

	grunt.initConfig({
		lambda_invoke: {
			default: {
				package: 'jwtAuthorize',
				options: {
					file_name: 'index.js',
					handler: 'handler',
					event: 'event.json'
				}
			}
		},
		lambda_deploy: {
			default: {
				package: 'jwtAuthorize',
				options: {
					file_name: 'index.js',
					handler: 'handler'
				},
				arn: 'arn:aws:lambda:us-east-1:' + grunt.option('account_id') + ':function:jwtAuthorize'
			}
		}
	})

}