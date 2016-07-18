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

function ifProd(value){
	if (process.env.NODE_ENV === 'production')
		return value
	else
		return undefined
}

config.plugind || (config.plugins === [])

config.plugins = config.plugins.concat(
	[
		ifProd(new webpack.optimize.DedupePlugin()),
		ifProd(new webpack.DefinePlugin({
			'precess.env': {
				NODE_ENV: '"production"'
			}
		})),
		ifProd(new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false,
			},
			sourceMap: false
		}))
	]
	.filter(x => !!x)
)

module.exports = config;
