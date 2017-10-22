import React from 'react';
import { IconButton } from 'material-ui'
import Edit from 'material-ui/svg-icons/editor/mode-edit';


const propTypes = {};

const defaultProps = {};

const EditButton = ({onAction}) => {

  return (
    <IconButton onClick={onAction}>
      <Edit color="#ff4081"/>
    </IconButton>
  );
};


export default EditButton;
EditButton.propTypes = propTypes;
EditButton.defaultProps = defaultProps;