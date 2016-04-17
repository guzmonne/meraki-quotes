import React from 'react'
import {Row, Col, Input, DropdownButton, Button, MenuItem} from 'react-bootstrap'
import accounting from 'accounting'
import Rx from 'rx'
import _ from 'lodash'

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

const MerakiQuotesDevicesDropdownOptions = ({collection, onToggle, open, onSelect}) =>
	<DropdownButton pullRight onToggle={onToggle} open={open} title="" id="MerakiQuotesDevicesOptions">
		{collection.map((x, i) => 
			<MenuItem
				href="javascript:void(0)"
				key={i}
				className="MerakiDeviceOption"
				onSelect={() => {
					console.log('Clicked')
					onSelect(x)
				}}
			>
				<table width="600px">
					<tbody>
						<tr>
							<td width="25%">{x.PartNumber}</td>
							<td width="60%">{x.Description.length > 60 ? 
								x.Description.replace(`Meraki ${x.PartNumber.replace('-HW', '')}`, '').slice(0, 60) + '...' 
								: 
								x.Description.replace(`Meraki ${x.PartNumber.replace('-HW', '')}`, '') }
							</td>
							<td width="15%">{accounting.formatMoney(x.Price, moneyOptions)}</td>
						</tr>
					</tbody>
				</table>
			</MenuItem>
		)}
	</DropdownButton>

MerakiQuotesDevicesDropdownOptions.displayName = 'MerakiQuotesDevicesDropdownOptions'

class MerakiQuotesSearchForm extends React.Component {
	constructor(){
		super()
		this.collectionSubject = new Rx.Subject()
		this.onSearchStringChange = this.onSearchStringChange.bind(this)
		this.onSearchStringFocus = this.onSearchStringFocus.bind(this)
		this.onToggleDropdown = this.onToggleDropdown.bind(this)
		this.onDeviceSelect = this.onDeviceSelect.bind(this)
		this.submit = this.submit.bind(this)
		this.state = {
			filteredCollection: [],
			isOpen: false,
			searchString: '',
			selected: {}
		}
	}

	componentWillMount(){
		this.collectionSubject.
			map(collection => !_.isArray(collection) ? [] : collection).
			flatMap(collection => Rx.Observable.
				fromArray(collection).
				filter(model => model.PartNumber.indexOf('LIC') === -1).
				filter(model => model.PartNumber.indexOf(this.state.searchString.toUpperCase()) > -1).
				take(10).
				reduce((acc, model) => [...acc, model], [])
			).
			subscribe(
				collection => this.setState({
					filteredCollection: collection
				})
			)
	}

	componentWillReceiveProps(nextProps){
		this.collectionSubject.onNext(nextProps.devices)
	}

	onSearchStringChange(){
		const searchString = this.refs.searchString.getValue()
		const isOpen = searchString !== ''	

		this.setState({searchString, isOpen})
		setTimeout(() => 
			this.collectionSubject.onNext(this.props.devices)
		)
	}

	onSearchStringFocus(){
		const searchString = this.refs.searchString.getValue()

		this.setState({isOpen: this.state.isOpen || searchString !== ''})
	}

	onToggleDropdown(isOpen){
		this.setState({isOpen})
	}

	onDeviceSelect(device){
		setTimeout(() => {
			this.setState({
				searchString: device.PartNumber,
				selected: device
			})
			console.log(this.state)
		})
	}

	submit(){
		const qty = parseInt(this.refs.qyt.getValue())
		const selected = Object.assign({}, this.state.selected)

		selected.Qty = qty
		selected.Intro = 0.2

		this.props.onAdd(selected)
	}

	render(){
		const {devices=[], updating} = this.props
		const {filteredCollection, isOpen, searchString} = this.state

		return (
			<Row className="MerakiQuotesEdit__device_search_form">
				<Col sm={8}>
					<Input 
						type="text"
						placeholder="Buscar equipos por modelo o descripción"
						ref="searchString"
						onChange={this.onSearchStringChange}
						value={searchString}
						buttonAfter={<MerakiQuotesDevicesDropdownOptions 
							collection={filteredCollection}
							onToggle={this.onToggleDropdown}
							open={isOpen}
							onSelect={this.onDeviceSelect}
						/>}
						disabled={updating}
					/>
				</Col>
				<Col sm={2}>
					<Input 
						type="number"
						defaultValue={1}
						ref="qyt"
					/>
				</Col>
				<Col sm={2}>
					<Button block onClick={this.submit}>
						<i className="fa fa-plus"></i>{' Agregar'}
					</Button>
				</Col>
			</Row>
		)
	}
}

MerakiQuotesSearchForm.propTypes = {
	devices: React.PropTypes.array,
	updating: React.PropTypes.bool
}

export default MerakiQuotesSearchForm