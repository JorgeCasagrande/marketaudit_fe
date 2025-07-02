import React from 'react';
import { Box, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import DashBoardMenuoptionStyle from 'theme/styles/components/DashBoardMenuoptionStyle';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { withRouter } from 'react-router-dom'

const DashBoardMenuOption = (props) => {
  const { classes, key, label, path } = props;

  const handleClick = (path) => {
    props.history.push(path);        
  };

  return (
    <React.Fragment>
      <Box className={classes.box} key={key} onClick={() => handleClick(path)}>
        <Box>
          {/* <IconButton onClick={() => handleClick(path)}> */}
            <FiberManualRecordRoundedIcon className={classes.icon}/>
          {/* </IconButton> */}
        </Box>
        <Box>
          <Typography color={'textPrimary'} className={classes.label} >{label}</Typography>
        </Box>
        <Box>
          <Typography color={'textPrimary'} className={classes.text} >Lorem impsum lorem impsum lore impsum lorem. Lorem impsum lorem impsum lore impsum loremim.</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default withRouter(withStyles(DashBoardMenuoptionStyle)(DashBoardMenuOption));