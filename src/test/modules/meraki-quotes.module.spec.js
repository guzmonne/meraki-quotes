import {expect} from 'chai'
import MerakiQuotes from '../../modules/meraki-quotes.module.js'

describe('MerakiQuotes Module', function(){
	
	it('should have the following methods', function(){
		expect(!!MerakiQuotes.randomQuote).to.be.true
	})

	describe('#MerakiQuotes.randomQuote()', function(){

		const quote1 = MerakiQuotes.randomQuote()
		const quote2 = MerakiQuotes.randomQuote()
		const quote = MerakiQuotes.randomQuote()

		it('should return a new quote object', function(){
			expect(typeof quote).to.equal('object')
		})

		it('should return a new quote object only with "Name" and "Description" keys', function(){
			expect(Object.keys(quote).length).to.equal(2)
			expect(!!quote.Name).to.be.true
			expect(!!quote.Description).to.be.true
		})
		
		it('should return a quote with different descriptions each time', function(){
			expect(quote1.Description === quote2.Description).to.be.false
		})

	})

})