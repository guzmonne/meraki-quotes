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
	toggleModal
}) =>
	<Grid className="MerakiQuotesIndex">
		<Row>
			<Col sm={3}>
				<MerakiQuotesMenu />
			</Col>
			<Col sm={9}>
			  <Row>
			  	<Col smOffset={9} sm={3}>
			  		<MerakiQuotesBreadcrumbs page={page} />
			  	</Col>
			  </Row>
				<Panel>
					<Row>
						<Col xs={8} className="MerakiQuotesIndex__buttons-toolbar">
							{/* TODO - Append the onCreate function */}
							<MerakiQuotesIndexToolbar onCreate={toggleModal} />
						</Col>
						<Col xs={4}>
							{/* TODO - Append the onChange function */}
							<InlineSearchForm onChange={() => {}} />
						</Col>
					</Row>
			  	<Row>
						<Col xs={12}>
							<MerakiQuotesTable collection={collection}/>
						</Col>
			  	</Row>
			  	<Row>			  		
						<Col xs={5}>
							{/* TODO - Append the onSelect function */}
							<PageSizeForm onSelect={() => {}} />
						</Col>
						<Col xs={2}>
							{/* TODO - Append the necessary parameters */}
							<ItemCount />
						</Col>
						<Col xs={4} xsOffset={1}>
							<div className="pull-right">
								{/* TODO - Append the necessary parameters */}
								<PrevNextPagination />
							</div>
						</Col>
			  	</Row>
				</Panel>
			</Col>
		</Row>
		{/* Meraki Quote create modal */}
		<MerakiQuoteCreateModal
			onShow={state.isShowingMerakiQuotesCreateModal}
			onToggle={toggleModal}
			onSubmit={onCreate}
		/>
	</Grid>