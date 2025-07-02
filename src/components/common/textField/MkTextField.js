import React from 'react';
import { TextField, withStyles, InputAdornment } from '@material-ui/core';

const styles = {
  textField: {
    backgroundColor: '#f4f8f9',
  },
  label: {
    paddingLeft: '5px'
  }
};

const MkTextField = ({classes, className, classNameInput, icon : Icon, endAdornment, ...props}) => {
  return (
    <TextField
      {...props}
      className={`${className} ${classes.textField} ${classes.underline}`}
      variant={'filled'}
      InputProps={{
        classes: {root: classNameInput},
        startAdornment: (
          <InputAdornment position="start">
            {
              Icon ? <Icon/> : ''
            }
          </InputAdornment>
        ),
        endAdornment:endAdornment
      }}
    />
  );
}

export default withStyles(styles)(MkTextField);