import { withStyles } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const styles = {
  datePicker: {
    height: '56px'
  },
}

const MKDatePicker = ({classes, className, icon : Icon, ...props}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        autoOk
        inputProps={{readOnly: true}}
        className={`${className} ${classes.datePicker}`}
        variant='inline'
        format='dd/MM/yyyy'
        inputVariant='standard'
      />
    </MuiPickersUtilsProvider>
  );
}

export default withStyles(styles)(MKDatePicker);