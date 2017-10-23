import React from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui'


const EmptyList = () => {

  return (
    <TableRow className="empty-list">
      <TableRowColumn>
        Empty List
      </TableRowColumn>
    </TableRow>
  )
}


export default EmptyList