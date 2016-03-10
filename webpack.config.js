var path = require('path')
var webpack = require('webpack')
var getConfig = require('hjs-webpack')

var index = [
	'<!doctype html>',
	'<meta charset="utf-8"/>',
	'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />',
	'<link rel="stylesheet" href="/assets-and-index-html.1.0.0.css"/>',
	'<body><div id="root"></div></body>',
	'<script src="/app.js"></script>'
].join('')

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: '!(images|favicon.ico)',
	isDev: process.env.NODE_ENV !== 'production',
	output: {
		hash: true
	},
	urlLoaderLimit: 10000,
	html: function(context){
		return {
			'index.html': context.defaultTemplate({
				html: [
					'<div id="root"></div>',
					'<script src="//cdn.auth0.com/js/lock-8.2.min.js"></script>',
					'<script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>'
				].join('')
			}),
			'200.html': context.defaultTemplate()
		}
	}
})

config.plugins = config.plugins.concat([
	new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	})
])

module.exports = config;
