import {expect} from 'chai'
import * as XLSHelpers from '../../../modules/xls/xls-helpers.js'

describe('XLSHelpers Module', function(){

	describe('#getFunctionName()', function(){

		it('should return undefined if the name function is invalid', function(){
			expect(XLSHelpers.getFunctionName('not a function')).to.be.undefined
		})

		it('should return the correct function name', function(){
			expect(XLSHelpers.getFunctionName('sum', 'en')).to.equal('SUM')
		})

		it('should return the default value if a language is not provided', function(){
			expect(XLSHelpers.getFunctionName('sum', 'en')).to.equal('SUM')
			expect(XLSHelpers.getFunctionName('sum')).to.equal('SUMA')
		})

		it('should return the default value if the language provided is not found', function(){
			expect(XLSHelpers.getFunctionName('sum', 'jp')).to.equal('SUMA')
		})

	})

	describe('#sum()', function(){
		afterEach(function(){
			window.localStorage = {}
		})

		it('should return the default #sum() value if @localStorage.excelLanguage is undefined', function(){
			window.localStorage = {}
			expect(XLSHelpers.sum()).to.equal('SUMA')
		})

		it('should return the appropiate function name according to the language stored in @localStorage.excelLanguage', function(){
			window.localStorage = {excelLanguage: 'en'}
			expect(XLSHelpers.sum()).to.equal('SUM')
		})

		it('should return the default value if the language stored in @localStorage.excelLanguage is invalid', function(){
			window.localStorage = {excelLanguage: 'jp'}
			expect(XLSHelpers.sum()).to.equal('SUMA')
		})

	})

})