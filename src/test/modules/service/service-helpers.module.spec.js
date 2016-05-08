import {expect} from 'chai'
import * as ServiceHelpers from '../../../modules/service/service-helpers.module.js'
import {Device1, Device2, License1, License2, quote} from './service.fixtures.js'

describe('Service Helpers Module', () => {

	describe('#isHardware()', () => {

		it('should return true if its a hardware device', () =>
			expect(ServiceHelpers.isHardware(Device1)).to.be.true
		)

		it('should return false if its not a hardware device', () =>
			expect(ServiceHelpers.isHardware(License1)).to.not.be.true
		)

	})

	describe('#isLicense()', function(){

		it('should return true if its a license', () =>
			expect(ServiceHelpers.isLicense(License1)).to.be.true
		)

		it('should return false if its not a license', () =>
			expect(ServiceHelpers.isLicense(Device1)).to.not.be.true
		)

	})

	describe('#getHardware()', function(){

		it('should return all the hardware from the devices array', function(){
			expect(ServiceHelpers.getHardware(quote).length).to.equal(2)
		})

		it('should return an empty array if there are no devices on the quote.Devices array', function(){
			expect(ServiceHelpers.getHardware({Devices: []}).length).to.be.empty
		})

	})

	describe('#getLicenses()', function(){

		it('should return all the licenses from the devices array', function(){
			expect(ServiceHelpers.getLicenses(quote).length).to.equal(2)
		})

		it('should return an empty array if there are no devices on the quote.Devices array', function(){
			expect(ServiceHelpers.getLicenses({Devices: []}).length).to.be.empty
		})

	})

	describe('#getModifier()', function(){

		it('should return a fix value if "isLogActivated" flag is down and [9x5xNBD, service]', function(){
			const isLogActivated = false
			const ServiceLevel   = '9x5xNBD'
			const type           = "service"
			const modifier       = ServiceHelpers.SERVICE_LEVEL_CONSTANTS[ServiceLevel][type]
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const result         = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			expect(result).to.equal(modifier)
		})

		it('should return a fix value if "isLogActivated" flag is down and [9x5xNBD, admin]', function(){
			const isLogActivated = false
			const ServiceLevel   = '9x5xNBD'
			const type           = "admin"
			const modifier       = ServiceHelpers.SERVICE_LEVEL_CONSTANTS[ServiceLevel][type]
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const result         = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			expect(result).to.equal(modifier)
		})

		it('should return a fix value if "isLogActivated" flag is down and [24x7x4, service]', function(){
			const isLogActivated = false
			const ServiceLevel   = '24x7x4'
			const type           = "service"
			const modifier       = ServiceHelpers.SERVICE_LEVEL_CONSTANTS[ServiceLevel][type]
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const result         = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			expect(result).to.equal(modifier)
		})

		it('should return a fix value if "isLogActivated" flag is down and [24x7x4, admin]', function(){
			const isLogActivated = false
			const ServiceLevel   = '24x7x4'
			const type           = "admin"
			const modifier       = ServiceHelpers.SERVICE_LEVEL_CONSTANTS[ServiceLevel][type]
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const result         = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			expect(result).to.equal(modifier)
		})

		it('should return 0 if a modifier could not be found', function(){
			expect(ServiceHelpers.getModifier(quote)).to.equal(0)
		})

		it('should return a variable value if "isLogActivated" flag is up and [9x5xNBD, service]', function(){
			const isLogActivated = true
			const ServiceLevel   = '9x5xNBD'
			const type           = "service"
			const modifier1      = 0.4444
			const modifier2      = 0.3136148775829395
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const _License1      = Object.assign({}, quote, {Qty: 10})
			const result1        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			const result2        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, _License1)
			expect(result1).to.equal(modifier1)
			expect(result2).to.equal(modifier2)
		})

		it('should return a variable value if "isLogActivated" flag is up and [9x5xNBD, admin]', function(){
			const isLogActivated = true
			const ServiceLevel   = '9x5xNBD'
			const type           = "admin"
			const modifier1      = 2.03
			const modifier2      = 1.4325792112812041
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const _License1      = Object.assign({}, quote, {Qty: 10})
			const result1        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			const result2        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, _License1)
			expect(result1).to.equal(modifier1)
			expect(result2).to.equal(modifier2)
		})

		it('should return a variable value if "isLogActivated" flag is up and [24x7x4, service]', function(){
			const isLogActivated = true
			const ServiceLevel   = '24x7x4'
			const type           = "service"
			const modifier1      = 1.405
			const modifier2      = 0.9915141831773853
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const _License1      = Object.assign({}, quote, {Qty: 10})
			const result1        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			const result2        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, _License1)
			expect(result1).to.equal(modifier1)
			expect(result2).to.equal(modifier2)
		})

		it('should return a variable value if "isLogActivated" flag is up and [24x7x4, admin]', function(){
			const isLogActivated = true
			const ServiceLevel   = '24x7x4'
			const type           = "admin"
			const modifier1      = 3.041
			const modifier2      = 2.1460460007419417
			const _quote         = Object.assign({}, quote, {ServiceLevel})
			const _License1      = Object.assign({}, quote, {Qty: 10})
			const result1        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, License1)
			const result2        = ServiceHelpers.getModifier(_quote, {isLogActivated, type}, _License1)
			expect(result1).to.equal(modifier1)
			expect(result2).to.equal(modifier2)
		})

	})

	describe('#calculateLogModifier()', function(){

		it('should return the value of the modifier based on the initial modifier and the license', function(){
			const _License1 = Object.assign({}, quote, {Qty: 10})
			expect(ServiceHelpers.calculateLogModifier(0.4444, License1)).to.equal(0.4444)
			expect(ServiceHelpers.calculateLogModifier(0.4444, _License1)).to.equal(0.3136148775829395)
		})

	})

	describe('#getLicenseMonths()', function(){

		it('should return the months configured in the quote', function(){
			expect(ServiceHelpers.getLicenseMonths({LicenceYears: 3})).to.equal(36)
		})

	})

	describe('#calculateSupportCost()', function(){
		
		it('should return the support cost for the given devices list', function(){
			const _quote = Object.assign({}, quote, {ServiceLevel: '9x5xNBD', LicenceYears: 3})
			expect(ServiceHelpers.calculateSupportCost(_quote, {type: 'service', isLogActivated: true})).to.equal(31.58021134070573)
		})

	})

	describe('#supportCostForLicense()', function(){

		it('should return the support cost from a given quote and license', function(){
			const _quote = Object.assign({}, quote, {ServiceLevel: '9x5xNBD', LicenceYears: 3})
			expect(ServiceHelpers.supportCostForLicense(_quote, {'type': 'service'}, License1)).to.equal(3.703333333333333)
		})

	})

	describe('#deviceCost()', function(){

		it('should return the hardware cost if the value of type is "hardware"', function(){
			const _quote = Object.assign({}, quote, {Discount: 0.43})
			expect(ServiceHelpers.deviceCost(_quote, "hardware", Device1)).to.equal(546.5160000000001)
			expect(ServiceHelpers.deviceCost(_quote, "hardware", Device2)).to.equal(19665)
		})

		it('should return the license cost if the value of type is "licenses"', function(){
			const _quote = Object.assign({}, quote, {Discount: 0.43})
			expect(ServiceHelpers.deviceCost(_quote, "licenses", License1)).to.equal(171.00000000000003)
			expect(ServiceHelpers.deviceCost(_quote, "licenses", License2)).to.equal(1824.0000000000002)
		})

	})

	describe('#calculateDeviceCost()', function(){

		it('should return the cost of the licenses of a given Devices array inside a quote', function(){
			const _quote = Object.assign({}, quote, {Discount: 0.43})
			expect(ServiceHelpers.calculateDeviceCost(_quote, 'hardware')).to.equal(20211.516)
		})

		it('should return the cost of the licenses of a given Devices array inside a quote', function(){
			const _quote = Object.assign({}, quote, {Discount: 0.43})
			expect(ServiceHelpers.calculateDeviceCost(_quote, 'licenses')).to.equal(1995.0000000000002)
		})

	})

})