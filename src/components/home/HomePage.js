import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HomePageStyle from 'theme/styles/components/HomePageStyle';
import { Box } from '@material-ui/core';
import DashBoardMenuOption from './DashBoardMenuOption';
import {menuRoutes} from 'app/Routes';

const HomePage = (props) => {
  const {classes} = props;

  const options = [];
    menuRoutes.map((route, index) => {
      route.items.map((item, key) => {
        if (item.pageLabel) {
          options.push(
            <DashBoardMenuOption
              key={`dash-${index}-${key}`}
              label={item.pageLabel}
              path={item.path}
            />
          );
        }
      });
    });

  return (
    <Box className={classes.box}>
      {options}
    </Box>
  );
};

export default withStyles(HomePageStyle)(HomePage);