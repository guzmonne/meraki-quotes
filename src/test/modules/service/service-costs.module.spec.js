import {expect} from 'chai'
import * as ServiceCosts from '../../../modules/service/service-costs.module.js'
import {Device1, Device2, License1, License2, quote} from './service.fixtures.js'

describe('Service Costs Module', function(){
	
	const _quote = Object.assign({}, quote, {
		Discount      : 0.43,
		ServiceMargin : 0.2,
		SoftwareMargin: 0.2,
		HardwareMargin: 0.2,
		LicenceYears  : 3,
		ServiceLevel  : '9x5xNBD'
	})

	const options = {
		isLogActivated: true,
	}

	describe('#calculateServiceCost()', function(){
		const _options = Object.assign({}, options, {type: 'service'})

		it('should return the cost of the service from the quote', function(){
			expect(ServiceCosts.calculateServiceCost(_quote, _options)).to.equal(53.40)
		})

		it('should be twice as expensive it the service level is 24x7x4', function(){
			const _quote_ = Object.assign({}, _quote, {ServiceLevel: '24x7x4'})
			expect(ServiceCosts.calculateServiceCost(_quote_, _options)).to.equal(106.8)
		})
	})

	describe('#calculateAdministrationCost()', function(){
		const _options = Object.assign({}, options, {type: 'admin'})

		it('should return the cost of the administration from the quote', function(){
			expect(ServiceCosts.calculateAdministrationCost(_quote, _options)).to.equal(343.99)
		})	
	})

	describe('#calculateHardwareCost', function(){
		it('should return the cost of the hardware from the quote', function(){
			expect(ServiceCosts.calculateHardwareCost(_quote)).to.equal(20211.516)
		})	
	})

	describe('#calculateLicenseCost', function(){
		it('should return the cost of the licenses from the quote', function(){
			expect(ServiceCosts.calculateLicenseCost(_quote)).to.equal(1995.0000000000002)
		})	
	})

})