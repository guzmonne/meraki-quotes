import React from 'react'
import {Table, Input} from 'react-bootstrap'
import Spinner from '../helpers/spinner.component.js'
import accounting from 'accounting'

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

const SpinnerTbody = () => 
	<tbody>
		<tr>
			<td colSpan="6" className="text-center">
				<Spinner></Spinner>
			</td>
		</tr>
	</tbody>

const CollectionTbody = ({collection=[], discount=1, onSelect, selected}) => 
	<tbody>
		{collection.map((product, i) =>
			<tr key={i} className={selected.indexOf(product.PartNumber) !== -1 ? "selected": ""}>
				<td className="text-center">
					<input
						type="checkbox"
						checked={selected.indexOf(product.PartNumber) !== -1}
						onChange={() => onSelect(product.PartNumber)}
					/>
				</td>
				<td className="text-center">
					<img 
						height="50"
						src={product.ImageUrl || 'http://placehold.it/64x48'}
						alt={product.PartNumber}/>
				</td>
				<td>{product.PartNumber}</td>
				<td>{product.Category}</td>
				<td>{product.Description}</td>
				<td>{accounting.formatMoney(product.Price * discount, moneyOptions)}</td>
			</tr>
		)}
	</tbody>

export default ({updating, collection, discount=1, onSelect, selected=[]}) =>
	<div>
		{updating && collection.length > 0 &&
			<span style={({position: 'absolute', top: "40%", left: "48%", fontSize: '50px'})}>
				<Spinner />
			</span>
		}
		<Table responsive bordered className={!!updating ? "table-updating" : null}>
			<thead>
				<tr>
					<th></th>
					<th>Imagen</th>
					<th>Número de Parte</th>
					<th>Categoría</th>
					<th>Descripción</th>
					<th>Precio</th>
				</tr>
			</thead>
			{collection.length === 0 && updating ?
				<SpinnerTbody /> 
				:
				<CollectionTbody
					discount={discount}
					collection={collection}
					selected={selected}
					onSelect={onSelect}
				/>}
		</Table>
	</div>
