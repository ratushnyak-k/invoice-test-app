import React from 'react'
import {
  RaisedButton,
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

const AddButton = ({title, onAdd, className}) => {

  return (
    <div className={className}>
      <RaisedButton
        label={`Create ${title}`}
        secondary={true}
        onClick={onAdd}
        icon={<ContentAdd />}
      />
    </div>
  )
}


export default AddButton