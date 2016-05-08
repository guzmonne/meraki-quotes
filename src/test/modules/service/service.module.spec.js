import {expect} from 'chai'
import Service from '../../../modules/service/service.module.js'
import {Device1, Device2, License1, License2, quote} from './service.fixtures.js'

describe('Service', () => {

	describe('#from()', () => {

		const options = {isLogActivated: true}

		const service = Service.from(quote, options)

		it('should return an object with all the following properties', () => {
			expect(!!service.getHardware).to.be.true
			expect(!!service.getLicenses).to.be.true
			expect(!!service.calculateHardwareCost).to.be.true
			expect(!!service.calculateHardwarePrice).to.be.true
			expect(!!service.calculateLicenseCost).to.be.true
			expect(!!service.calculateLicensePrice).to.be.true
			expect(!!service.calculateUnifiedMonthlyPrice).to.be.true
			expect(!!service.calculateAdministeredMonthlyPrice).to.be.true
			expect(!!service.calculateTraditionalMonthlyPrice).to.be.true
			expect(!!service.calculateServiceCost).to.be.true
			expect(!!service.calculateServicePrice).to.be.true
			expect(!!service.calculateAdministrationCost).to.be.true
			expect(!!service.calculateAdministrationPrice).to.be.true
		})

	})

})