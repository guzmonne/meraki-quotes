import {expect} from 'chai'
import * as ServicePrices from '../../../modules/service/service-prices.module.js'
import {Device1, Device2, License1, License2, quote} from './service.fixtures.js'

describe('Service Prices Module', function(){

	const _quote = Object.assign({}, quote, {
		Discount      : 0.43,
		ServiceMargin : 0.2,
		AdminMargin   : 0.2,
		SoftwareMargin: 0.2,
		HardwareMargin: 0.2,
		LicenceYears  : 3,
		ServiceLevel  : '9x5xNBD'
	})

	const _options = {
		isLogActivated: true,
	}

	describe('#calculateHardwarePrice()', function(){

		it('should return the price of the hardware from a quote', function(){
			expect(ServicePrices.calculateHardwarePrice(_quote)).to.equal(25264.39)
		})

	})

	describe('#calculateLicensePrice()', function(){

		it('should return the price of the licenses from a quote', function(){
			expect(ServicePrices.calculateLicensePrice(_quote)).to.equal(2493.75)
		})
		
	})	

	describe('#calculateServicePrice()', function(){

		it('should return the price of the service from a quote', function(){
			expect(ServicePrices.calculateServicePrice(_quote, _options)).to.equal(39.48)
		})
		
	})	

	describe('#calculateAdministrationPrice()', function(){

		it('should return the price of the administration from a quote', function(){
			expect(ServicePrices.calculateAdministrationPrice(_quote, _options)).to.equal(180.32)
		})
		
	})

	describe('#calculateFinancedHardwarePrice()', function(){

		it('should return the price of the financed hardware from a quote', function(){
			expect(ServicePrices.calculateFinancedHardwarePrice(_quote)).to.equal(1010.58)
		})
		
	})

})