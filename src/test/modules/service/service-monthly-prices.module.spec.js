import {expect} from 'chai'
import * as ServiceMonthly from '../../../modules/service/service-monthly-prices.module.js'
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

	describe('#calculateLicenseMonthlyPrice()', function(){
		
		it('should calculate the monthly price of the licenses', function(){
			expect(ServiceMonthly.calculateLicenseMonthlyPrice(_quote, _options)).to.equal(69.27)
		})

	})

	describe('#calculateUnifiedMonthlyPrice()', function(){

		it('should return the Unified Monthly Price', function(){
			expect(ServiceMonthly.calculateUnifiedMonthlyPrice(_quote, _options)).to.equal(1313.40)
		})

	})

	describe('#calculateAdministeredMonthlyPrice()', function(){

		it('should return the Administered Monthly Price', function(){
			expect(ServiceMonthly.calculateAdministeredMonthlyPrice(_quote, _options)).to.equal(479.68)
		})

	})

	describe('#calculateTraditionalMonthlyPrice()', function(){

		it('should return the Traditional Monthly Price', function(){
			expect(ServiceMonthly.calculateTraditionalMonthlyPrice(_quote, _options)).to.equal(135.69)
		})

	})

})