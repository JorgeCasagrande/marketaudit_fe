import React from 'react';
import { AppBar, IconButton, Typography, Badge } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolbarStyle from 'theme/styles/components/ToolbarStyle';
import {routes} from 'app/Routes';
import {removeUser} from 'helpers/AuthenticationHelper';
import { withRouter } from 'react-router-dom';

const Header = (props) => {
  const {classes, handleDrawerToggle} = props;

  const handleLogout = () => {
    removeUser();
    props.history.push(routes.login);
  };

  return (
    <React.Fragment>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuIcon}
            onClick={handleDrawerToggle}
          >
            <MenuIcon/>
          </IconButton>
          <Typography>Market Audit</Typography>
          <div className={classes.endSection}>
            <IconButton className={classes.notificationIcon}>
              <Badge badgeContent={0}>
                <NotificationsOutlinedIcon/>
              </Badge>
            </IconButton>
            <IconButton
             className={classes.accountIcon}
             onClick={handleLogout}
            >
              <AccountCircle></AccountCircle>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(withStyles(ToolbarStyle)(Header));