import React from 'react';
import {defaultUrl} from 'constants/constants';
import { withStyles, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';

const styles = {
  select: {
    height: '56px'
  },
  iconOption: {
    height: '35px',
    width: '35px',
    paddingRight: '5px',
    marginTop: '-5px'
  },
  flex: {
    display: 'flex',
    height: '25px'
  },
  label: {
    paddingLeft: '5px'
  }
};

const MkSelectIcon = ({classes, className, label, options, icon : Icon, ...props}) => {
  return (
    <FormControl variant='filled' className={`${className} ${classes.select}`}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        {...props}
        className={`${className} ${classes.select}`}
      >
        {
          options.map((item, key) => {
            return (
              <MenuItem
                key={key}
                value={item.Key}
              >
                {
                  item.Value &&
                  <div className={classes.flex}>
                  <img src={`${defaultUrl}/${item.Value}`} className={classes.iconOption} />
                  <Typography>{item.Description || ''}</Typography>
                  </div>
                }
              </MenuItem>
            );
          })
        }
      </Select>

    </FormControl>
  );
}

export default withStyles(styles)(MkSelectIcon);