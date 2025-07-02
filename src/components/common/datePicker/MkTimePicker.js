import React from 'react';
import { withStyles } from '@material-ui/core';
import { KeyboardTimePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const styles = {
  timePicker: {
    backgroundColor: '#f4f8f9',
    height: '56px'
  },  
}

const MkTimePicker = ({className, classes, ...props}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        {...props}
        inputProps={{readOnly: true}}
        inputVariant='filled'
        className={`${className} ${classes.timePicker}`}
      />
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(MkTimePicker);