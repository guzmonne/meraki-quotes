require('babel-register')()

var jsdom = require('jsdom').jsdom

var exposedProperties = ['window', 'navigator', 'document', 'localStorage']

global.document = jsdom('')
global.window   = document.defaultView

Object.keys(document.defaultView).map(property => {
	if (typeof global[property] === 'undefined'){
		exposedProperties.push(property)
		global[property] = document.defaultView[property]
	}
})

global.window.localStorage = {}

global.navigator = {
	userAgent: 'node.js'
}

documentRef = document