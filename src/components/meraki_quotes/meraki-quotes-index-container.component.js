import React from 'react'
import {
	Grid,
	Row,
	Col,
	Panel,
	Button,
	ButtonToolbar,
	ButtonGroup
} from 'react-bootstrap'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import MerakiQuotesBreadcrumbs from './meraki-quotes-breadcrumbs.component.js'
import MerakiQuotesTable from './meraki-quotes-table.component.js'
import MerakiQuotesIndexToolbar from './meraki-quotes-index-toolbar.component.js'
import InlineSearchForm from '../helpers/inline-search-form.component.js'
import PageSizeForm from '../helpers/page-size-form.component.js'
import ItemCount from '../helpers/item-count.component.js'
import PrevNextPagination from '../helpers/prev-next-pagination.component.js'
import MerakiQuoteCreateModal from './meraki-quote-create-modal.component.js'

export default ({
	state,
	collection=[],
	page="index",
	onCreate,
	onUpdate,
	toggleModal,
	setPageSize,
	setQueryString
}) =>
		<Panel>
			<Row>
				<Col xs={8} className="MerakiQuotesIndex__buttons-toolbar">
					{/* TODO - Append the onCreate function */}
					<MerakiQuotesIndexToolbar onCreate={toggleModal} />
				</Col>
				<Col xs={4}>
					<InlineSearchForm placeholder={'Buscar nombre...'} onChange={queryString => {
						setQueryString(queryString)
						onUpdate(0)
					}} />
				</Col>
			</Row>
	  	<Row>
				<Col xs={12}>
					<MerakiQuotesTable 
						collection={state.collection}
						updating={state.isGettingMerakiQuotes}
					/>
				</Col>
	  	</Row>
	  	<Row>			  		
				<Col xs={6}>
					{/* TODO - Append the onSelect function */}
					<PageSizeForm onSelect={pageSize => {setPageSize(pageSize); onUpdate(0)}} />
				</Col>
				<Col xs={6}>
					<div className="pull-right">
						{/* TODO - Append the necessary parameters */}
						<PrevNextPagination 
							updating={state.isGettingMerakiQuotes}
							page={state.page}
							lastPage={state.pagination.length - 1}
							onUpdate={onUpdate}
						/>
					</div>
				</Col>
	  	</Row>
			{/* Meraki Quote create modal */}
			<MerakiQuoteCreateModal
				onShow={state.isShowingMerakiQuotesCreateModal}
				onToggle={toggleModal}
				onSubmit={onCreate}
			/>
		</Panel>