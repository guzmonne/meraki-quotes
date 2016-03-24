import {awsConfig} from './modules/aws.module.js'

if (!!localStorage.token)
	awsConfig(JSON.parse(localStorage.token))
else
	awsConfig()