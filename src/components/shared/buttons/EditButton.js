import React from 'react';
import { IconButton } from 'material-ui'
import Edit from 'material-ui/svg-icons/editor/mode-edit';

const EditButton = ({onAction}) => {

  return (
    <IconButton onClick={onAction}>
      <Edit color="#ff4081"/>
    </IconButton>
  );
};


export default EditButton;