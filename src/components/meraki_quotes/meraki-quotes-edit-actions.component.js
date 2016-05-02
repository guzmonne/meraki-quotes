import React from 'react'
import MerakiQuoteXML from '../../modules/xls/meraki-quote/meraki-quote.xml.js'

class MerakiQuotesActions extends React.Component {
	constructor(){
		super()

		this.downloadQuote = this.downloadQuote.bind(this)
	}

	downloadQuote(){
		const blob = new Blob([MerakiQuoteXML(this.props.quote, this.props.isLogActivated)], {type: "application/xls"});
		saveAs(blob, `${this.props.quote.Name}.xls`);
	}

	render(){
		const {onRemoveDevice} = this.props
		const {downloadQuote} = this

		return (
			<ul className="list-inline pull-right">
				<li><a className="text-info" href="#"><i className="fa fa-share"></i>{' Compartir'}</a></li>
				<li><a className="text-info" href="#"><i className="fa fa-clone"></i>{' Clonar'}</a></li>
				<li onClick={downloadQuote}>
					<a className="text-info" href="#"><i className="fa fa-download"></i>{' Descargar'}</a>
				</li>
				<li onClick={onRemoveDevice}>
					<a className="text-primary" href="#"><i className="fa fa-trash"></i>{' Eliminar'}</a>
				</li>
			</ul> 
		)
	}
}

MerakiQuotesActions.propTypes = {
	onRemoveDevice: React.PropTypes.func.isRequired,
	quote: React.PropTypes.object
}

export default MerakiQuotesActions