var path = require('path')
var webpack = require('webpack')
var getConfig = require('hjs-webpack')

var defaultIndex = [
	'<div id="root"></div>'
]

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: '!(js|images|favicon.ico)',
	output: {
		hash: true
	},
	html: function(context){
		return {
			'index.html': context.defaultTemplate({
				html: defaultIndex
			})
		}
	}
})

config.externals = {
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
}

module.exports = config;
