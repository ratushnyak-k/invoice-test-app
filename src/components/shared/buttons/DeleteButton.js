import React from 'react';
import { IconButton } from 'material-ui'
import Delete from 'material-ui/svg-icons/action/delete';

const DeleteButton = ({onAction}) => {

  return (
    <IconButton onClick={onAction}>
      <Delete color="#ff4081"/>
    </IconButton>
  );
};


export default DeleteButton;