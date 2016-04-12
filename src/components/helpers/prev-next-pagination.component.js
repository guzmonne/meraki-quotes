import React from 'react'
import {Pager, PageItem} from 'react-bootstrap'
import _ from 'lodash'

const PrevNextPagination = ({
  updating=false,
  page=0,
  lastPage=10,
  onUpdate=function(){},
  prevDisabled=function(){},
  nextDisabled=function(){}
}) =>
  <Pager>
    <PageItem
    	disabled={prevDisabled() || page - 1 < 0 || updating}
    	onSelect={() => onUpdate(-1)}
    >
    	Anterior
  	</PageItem>
    {' '}
    <PageItem 
    	disabled={nextDisabled() || page >= lastPage || updating}
    	onSelect={() => onUpdate(1)}
    >
    	Siguiente
  	</PageItem>
  </Pager>

PrevNextPagination.propTypes = {
  updating    : React.PropTypes.bool,
  page        : React.PropTypes.number,
  lastPage    : React.PropTypes.number,
  onUpdate    : React.PropTypes.func,
  prevDisabled: React.PropTypes.func,
  nextDisabled: React.PropTypes.func
}

export default PrevNextPagination