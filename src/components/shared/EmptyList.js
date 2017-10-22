import React from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui'


const propTypes = {}

const defaultProps = {}

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
EmptyList.propTypes = propTypes
EmptyList.defaultProps = defaultProps