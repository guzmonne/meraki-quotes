import React from 'react'
import {Table} from 'react-bootstrap'
import Spinner from '../helpers/spinner.component.js'
import accounting from 'accounting'

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

const SpinnerTbody = () => 
	<tbody>
		<tr>
			<td colSpan="5" className="text-center">
				<Spinner></Spinner>
			</td>
		</tr>
	</tbody>

const CollectionTbody = ({collection=[]}) => 
	<tbody>
		{collection.map((product, i) =>
			<tr key={i}>
				<td className="text-center">
					<img 
						height="50"
						src={product.ImageUrl || 'http://placehold.it/64x48'}
						alt={product.PartNumber}/>
				</td>
				<td>{product.PartNumber}</td>
				<td>{product.Category}</td>
				<td>{product.Description}</td>
				<td>{accounting.formatMoney(product.Price, moneyOptions)}</td>
			</tr>
		)}
	</tbody>

export default ({updating, collection}) =>
	<Table responsive bordered>

		<thead>
			<tr>
				<th></th>
				<th># de Parte</th>
				<th>Categoría</th>
				<th>Descripción</th>
				<th>Precio</th>
			</tr>
		</thead>
		{collection.length === 0 && updating ?
			<SpinnerTbody /> : <CollectionTbody collection={collection} />}
	</Table>
