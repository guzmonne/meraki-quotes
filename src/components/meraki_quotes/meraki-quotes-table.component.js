import React from 'react'
import {Table, Input} from 'react-bootstrap'
import Spinner from '../helpers/spinner.component.js'

const SpinnerTbody = () => 
	<tbody>
		<tr>
			<td colSpan="4" className="text-center">
				<Spinner></Spinner>
			</td>
		</tr>
	</tbody>

const CollectionTbody = ({collection=[], discount=1, onSelect, selected}) => 
	<tbody>
		{collection.map((model, i) =>
			<tr key={i} className={selected.indexOf(model.ID) !== -1 ? "selected": ""}>
				<td className="text-center">
					<input
						type="checkbox"
						checked={selected.indexOf(model.ID) !== -1}
						onChange={() => onSelect(model.ID)}
					/>
				</td>
				<td>{model.ID}</td>
				<td>{model.Name}</td>
				<td>{model.Description}</td>
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
					<th>ID</th>
					<th>Nombre</th>
					<th>Descripción</th>
				</tr>
			</thead>
			{collection.length === 0 && updating ?
				<SpinnerTbody /> 
				:
				<CollectionTbody
					collection={collection}
					selected={selected}
					onSelect={onSelect}
				/>}
		</Table>
	</div>
