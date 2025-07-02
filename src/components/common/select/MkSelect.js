import { withStyles, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const styles = {
  select: {
    backgroundColor: '#f4f8f9',
    height: '56px'
  },
  text: {
    marginLeft: '7px'
  },
  label: {
    paddingLeft: '5px'
  }
};

const MkSelect = ({classes, classNameSelect, classNameFormControl, label, options, icon : Icon, ...props}) => {
  return (
    <FormControl variant='filled' className={`${classNameFormControl} ${classes.select}`}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        {...props}
        className={`${classNameSelect}`}
      >
        {
          options.map((item, key) => {
            return (
              <MenuItem
               key={key}
               value={item.key}
              >
                {
                  item.value &&
                  <div className={classes.text}>
                    {item.value}
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

export default withStyles(styles)(MkSelect);