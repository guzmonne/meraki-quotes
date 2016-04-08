import React from 'react'
import {Pager, PageItem} from 'react-bootstrap'
import _ from 'lodash'

export default ({updating=false, page=0, pageSize=10, total=10, onUpdate=_.noop}) =>
  <Pager>
    <PageItem
    	disabled={page - 1 < 0 || updating}
    	onSelect={() => onUpdate(-1)}
    >
    	Anterior
  	</PageItem>
    {' '}
    <PageItem 
    	disabled={(page + 1) * pageSize > total || updating}
    	onSelect={() => onUpdate(1)}
    >
    	Siguiente
  	</PageItem>
  </Pager>