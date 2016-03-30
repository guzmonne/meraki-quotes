var path = require('path')
var webpack = require('webpack')
var getConfig = require('hjs-webpack')


var awsSdk = [
	'<script src="/js/aws-sdk/lib/axios/dist/axios.standalone.js"></script>',
	'<script src="/js/aws-sdk/lib/CryptoJS/rollups/hmac-sha256.js"></script>',
	'<script src="/js/aws-sdk/lib/CryptoJS/rollups/sha256.js"></script>',
	'<script src="/js/aws-sdk/lib/url-template/url-template.js"></script>',
	'<script src="/js/aws-sdk/lib/apiGatewayCore/sigV4Client.js"></script>',
	'<script src="/js/aws-sdk/lib/apiGatewayCore/apiGatewayClient.js"></script>',
	'<script src="/js/aws-sdk/lib/apiGatewayCore/simpleHttpClient.js"></script>',
	'<script src="/js/aws-sdk/lib/apiGatewayCore/utils.js"></script>',
	'<script src="/js/aws-sdk/apigClient.js"></script>'
]

var index = [
	'<!doctype html>',
	'<meta charset="utf-8"/>',
	'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />',
	'<link rel="stylesheet" href="/assets-and-index-html.1.0.0.css"/>',
	'<body><div id="root"></div></body>',
	'<script src="/app.js"></script>'
].concat(awsSdk).join('')

var defaultIndex = [
	'<div id="root"></div>'
]

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: '!(js|images|favicon.ico)',
	isDev: process.env.NODE_ENV !== 'production',
	output: {
		hash: true
	},
	urlLoaderLimit: 10000,
	html: function(context){
		return {
			'index.html': context.defaultTemplate({
				html: defaultIndex/*.concat(awsSdk)*/.join('')
			})
		}
	}
})

/*
config.plugins = config.plugins.concat([
	new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	})
])
*/

module.exports = config;
