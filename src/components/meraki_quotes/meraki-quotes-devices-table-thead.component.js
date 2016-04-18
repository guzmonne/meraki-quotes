import React from 'react'

const tableWidths = {
	select: '3%',
	qty: '8%',
	intro: '8%',
	margin: '5%',
	discount: '5%',
	salesPrice: '10%',
	subTotal: '10%',
	listPrice: '10%'
}

export default ({onSelect, selectedAll}) =>
	<thead>
		<tr>
			<th width={tableWidths.select}>
				<input
					type="checkbox"
					onChange={() => onSelect('all')}
					checked={selectedAll}
				/>
			</th>
			<th>Hardware</th>
			<th width={tableWidths.listPrice}>
				{'Precio de Lista '}<span className="text-muted">(USD)</span>
			</th>
			<th className="text-center" width={tableWidths.qty}>
				Qty
			</th>
			<th className="text-center" width={tableWidths.discount}>
				{'Desc. '}<span className="text-muted">(%)</span>
			</th>
			<th className="text-center" width={tableWidths.intro}>
				{'Intro. '}<span className="text-muted">(%)</span>
			</th>
			<th className="text-center" width={tableWidths.margin}>
				{'Margen '}<span className="text-muted">(%)</span>
			</th>
			<th width={tableWidths.salesPrice}>
				{'Precio de Venta '}<span className="text-muted">(USD)</span>
			</th>
			<th width={tableWidths.subTotal}>
				{'Sub-Total '}<span className="text-muted">(USD)</span>
			</th>
		</tr>
	</thead>