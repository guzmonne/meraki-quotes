import React from 'react'
import Chart from 'react-chartjs'
import _ from 'lodash'
import SizeMe from 'react-sizeme'

import {serviceLogPrice} from '../../modules/meraki-quotes-devices.module.js'
import SolutionCalc from '../../modules/solution-calc.module.js'

const LineChart = Chart.Line

var data1 = {
  labels: _.range(60).map(x => x+1),
  datasets: [
    {
			label               : "Servicio Mensual por cantidad.",
			fillColor           : "rgba(220,220,220,0.2)",
			strokeColor         : "rgba(220,220,220,1)",
			pointColor          : "rgba(220,220,220,1)",
			pointStrokeColor    : "#fff",
			pointHighlightFill  : "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data                : []
    }
  ]
};

var data2 = {
  labels: _.range(60).map(x => x+1),
  datasets: [
    {
			label               : "Servicio Mensual por cantidad.",
			fillColor           : "rgba(220,220,220,0.2)",
			strokeColor         : "rgba(220,220,220,1)",
			pointColor          : "rgba(220,220,220,1)",
			pointStrokeColor    : "#fff",
			pointHighlightFill  : "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data                : []
    }
  ]
};

class MerakiQuotesServiceChart extends React.Component {
	constructor(){
		super()
	}

	render(){
		const {quote, license, options={}, width, height, size} = this.props

		const dataset1 = data1.datasets[0]
		const dataset2 = data2.datasets[0]
		
		dataset1.data = data1.labels.
			map(x => 
				SolutionCalc.supportCostLogFor(quote, "admin", Object.assign({}, license, {Qty: x}))
			)

		dataset2.data = data2.labels.
			map(x => 
				Math.round(
					(SolutionCalc.supportCostLogFor(quote, "admin", Object.assign({}, license, {Qty: x})) * x) * 100
				)/100
			)

		return (
			<div ref="chart">
				<LineChart 
					data={data1}
					options={options}
					width={size.width || 600}
					height={size.height || 300}
				/>
				<LineChart 
					data={data2}
					options={options}
					width={size.width || 600}
					height={size.height || 300}
				/>
			</div>
		)
	}
}

MerakiQuotesServiceChart.propTypes = {
	data   : React.PropTypes.object,
	options: React.PropTypes.object,
	width  : React.PropTypes.number,
	height : React.PropTypes.number,
	size   : React.PropTypes.shape({
		width : React.PropTypes.number.isRequired,
		height: React.PropTypes.number,
	})
}

export default SizeMe()(MerakiQuotesServiceChart)
