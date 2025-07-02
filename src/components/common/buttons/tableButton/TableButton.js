import './TableButton.scss';
import { Button } from '@material-ui/core';
import React from 'react';

const TableButton = (props) => {
  return (
    <Button
      {...props}
      className='tableButton'
    >
      {props.title || ''}
    </Button>    
  );
}

export default TableButton;