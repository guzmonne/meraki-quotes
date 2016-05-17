import Service from '../../service/service.module.js'
import {sum} from '../xls-helpers.js'

export const Columns = `
   <Column ss:Width="189"/>
   <Column ss:Width="267.75"/>
   <Column ss:Width="72.75"/>
   <Column ss:Width="29.25"/>
   <Column ss:Width="54.75"/>
   <Column ss:Width="27.75"/>
   <Column ss:Width="40.5"/>
   <Column ss:Width="79.5"/>
   <Column ss:Width="49.5"/>
`

export const Thead = `
	<Row>
		<Cell ss:StyleID="s260"><Data ss:Type="String">Numero de Parte</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Descripción</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Precio de Lista</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Cant.</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Descuento</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Intro</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Margen</Data></Cell>
		<Cell ss:StyleID="s261"><Data ss:Type="String">Precio de Venta</Data></Cell>
		<Cell ss:StyleID="s262"><Data ss:Type="String">Sub-Total</Data></Cell>
	</Row>
`

export const SubHeaderRow = (title) => `
   <Row ss:AutoFitHeight="0" ss:Height="12.75">
    <Cell ss:StyleID="s263"><Data ss:Type="String">${title || "Inserte su título"}</Data></Cell>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s264"/>
    <Cell ss:StyleID="s265"/>
   </Row>
`

const sellingPrice = (model, quote) => 
	model.Price * (1 - quote.Discount) * (1 + (model.Intro || 0)) / (1 - quote.HardwareMargin)

export const HardwareRow = (hardware, quote) => `
<Row>
	<Cell ss:StyleID="s266"><Data ss:Type="String">${hardware.PartNumber}</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="String">${hardware.Description}</Data></Cell>
	<Cell ss:StyleID="s291"><Data ss:Type="Number">${hardware.Price}</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="Number">${hardware.Qty}</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">${quote.Discount}</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">${hardware.Intro}</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">${quote.HardwareMargin}</Data></Cell>
	<Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])">
		<Data ss:Type="Number"></Data>
	</Cell>
	<Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
`

export const LicenseRow = (license, quote) => `
<Row>
	<Cell ss:StyleID="s266"><Data ss:Type="String">${license.PartNumber}</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="String">${license.Description}</Data></Cell>
	<Cell ss:StyleID="s291"><Data ss:Type="Number">${license.Price}</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="Number">${license.Qty}</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">${quote.Discount}</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">0</Data></Cell>
	<Cell ss:StyleID="s279"><Data ss:Type="Number">${quote.SoftwareMargin}</Data></Cell>
	<Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])">
		<Data ss:Type="Number"></Data>
	</Cell>
	<Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
`

export const ServiceRow = (quote, isLogActivated) => `
<Row>
	<Cell ss:StyleID="s266"><Data ss:Type="String">Soporte</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="String">Cuota Mensual</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s295">
		<Data ss:Type="Number">${Service.from(quote, {isLogActivated}).calculateServiceCost()}</Data>
	</Cell>
</Row>
`

export const AdminRow = (quote, isLogActivated) => `
<Row>
	<Cell ss:StyleID="s266"><Data ss:Type="String">Administración</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="String">Cuota Mensual</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s295">
		<Data ss:Type="Number">${Service.from(quote, {isLogActivated}).calculateAdministrationCost()}</Data>
	</Cell>
</Row>
`

export const HardwareFinancingRow = (quote, isLogActivated) => `
<Row ss:Height="15.75">
	<Cell ss:StyleID="s271"><Data ss:Type="String">Financiación de Equipos</Data></Cell>
	<Cell ss:StyleID="s272"><Data ss:Type="String">Cuota mensual bajo contrato a 36 meses</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s297" ss:Formula="=${sum()}(R[${hardwareBegins(quote, 1)}]C:R[${hardwareEnds(quote, 1)}]C)*0.033">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
`

export const LicenseFinancingRow = (quote, isLogActivated) => `
<Row ss:Height="15.75">
	<Cell ss:StyleID="s266"><Data ss:Type="String">Financiación de Licencias</Data></Cell>
	<Cell ss:StyleID="s267"><Data ss:Type="String">Cuota mensual</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s96"><Data ss:Type="String">-</Data></Cell>
	<Cell ss:StyleID="s295" ss:Formula="=${sum()}(R[${licenseBegins(quote, 2)}]C:R[${licenseEnds(quote, 2)}]C)/${quote.LicenceYears*12}">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
`

export const UnifiedSolutionPanel = (quote, isLogActivated) => `
<Row>
	<Cell ss:Index="2" ss:StyleID="s248"><Data ss:Type="String">Solución Unificada</Data></Cell>
	<Cell ss:StyleID="s249"/>
</Row>
<Row>
	<Cell ss:Index="2" ss:StyleID="s250"><Data ss:Type="String">Cuota Mensual</Data></Cell>
	<Cell ss:StyleID="s303" ss:Formula="=${sum()}(R[-6]C[6]:R[-3]C[6])"><Data
  	ss:Type="Number"></Data></Cell>
</Row>
<Row ss:Height="15.75">
	<Cell ss:Index="2" ss:StyleID="s252"><Data ss:Type="String">OBS: Contrato a 36 meses obligatorio.</Data></Cell>
	<Cell ss:StyleID="s253"/>
</Row>
`

const hardwareBegins = (quote, offset) => offset /*Under table*/ 
																					- 2 /*Two Sub headings*/
																					- 4 /*Service, Administration, Licenses, and Financing*/
																					- (Service.from(quote).getHardware(quote.Devices) || []).length /*Hardware Lenght*/
																					- (Service.from(quote).getLicenses(quote.Devices) || []).length /*Software Length*/

const hardwareEnds = (quote, offset) => hardwareBegins(quote, offset) + (Service.from(quote).getHardware(quote.Devices) || []).length - 1

const licenseBegins = (quote, offset) => offset /*Under Table*/
																				- 1 /*One Sub headings*/
																				- 4 /*Service, Administration, Licenses, and Financing*/
																				- (Service.from(quote).getLicenses(quote.Devices) || []).length /*Software Length*/

const licenseEnds = (quote, offset) => licenseBegins(quote, offset) + (Service.from(quote).getLicenses(quote.Devices) || []).length - 1

export const AdministeredSolutionPanel = (quote, isLogActivated) => `
<Row>
	<Cell ss:Index="2" ss:StyleID="s97"><Data ss:Type="String">Solución Administrada</Data></Cell>
	<Cell ss:StyleID="s98"/>
</Row>
<Row>
	<Cell ss:Index="2" ss:StyleID="s99"><Data ss:Type="String">Inversión Inicial</Data></Cell>
	<Cell ss:StyleID="s304" ss:Formula="=${sum()}(R[${hardwareBegins(quote, -6)}]C[6]:R[${hardwareEnds(quote, -6)}]C[6])">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
<Row ss:Height="15.75">
	<Cell ss:Index="2" ss:StyleID="s148"><Data ss:Type="String">Cuota mensual</Data></Cell>
	<Cell ss:StyleID="s305" ss:Formula="=${sum()}(R[-11]C[6]:R[-9]C[6])">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
`
export const TraditionalSolutionPanel = (quote, isLogActivated) => `
<Row>
	<Cell ss:Index="2" ss:StyleID="s242"><Data ss:Type="String">Solución Tradicional</Data></Cell>
	<Cell ss:StyleID="s243"/>
</Row>
<Row>
	<Cell ss:Index="2" ss:StyleID="s244"><Data ss:Type="String">Inversión Inicial</Data></Cell>
	<Cell ss:StyleID="s306" ss:Formula="=${sum()}(R[${hardwareBegins(quote, -10)}]C[6]:R[${hardwareEnds(quote, -10)}]C[6])">
		<Data ss:Type="Number"></Data>
	</Cell>
</Row>
<Row ss:Height="15.75">
	<Cell ss:Index="2" ss:StyleID="s246"><Data ss:Type="String">Cuota mensual</Data></Cell>
		<Cell ss:StyleID="s307" ss:Formula="=R[-15]C[6]+R[-13]C[6]">
			<Data ss:Type="Number"></Data>
		</Cell>
</Row>
`