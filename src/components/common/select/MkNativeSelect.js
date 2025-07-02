import React from 'react';
import { withStyles, InputAdornment, FormControl, InputLabel, MenuItem, Select, Input, NativeSelect } from '@material-ui/core';

const styles = theme => ({
  formControl: {
    backgroundColor: '#f4f8f9',
    height: '40px',
    margin: theme.spacing(1)
  },
  select: {
    marginTop: theme.spacing(2),
  },
  text: {
    marginLeft: '7px'
  },
  label: {
    paddingLeft: '5px'
  }
});

const MkNativeSelect = ({classes, className, label, options, icon : Icon, ...props}) => {
  return (
    <FormControl variant='filled' className={`${className} ${classes.formControl}`}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <NativeSelect
        {...props}
        className={`${className} ${classes.select}`}
      >
        {
          options.map((item, key) => {
            return (
              <option
               key={key}
               value={item.Key}
              >
                {
                  item.Value
                }
              </option>
            );
          })
        }     
      </NativeSelect>

    </FormControl>    
  );
}

export default withStyles(styles)(MkNativeSelect);