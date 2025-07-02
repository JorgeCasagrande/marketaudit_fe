import React, { useState } from 'react';
import {menuRoutes} from 'app/Routes';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, Collapse, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import SideBarStyle from 'theme/styles/components/SideBarStyle';

const SideBar = (props) => {
  const {openSidebar, handleDrawerToggle, classes} = props;
  const [expand, setExpand] = useState({});

  const handleExpandClick = (key) => {
    setExpand({[`${key}`]: !expand[key]});
  };

  const handleListItemClick = () => {
    setExpand({});
    handleDrawerToggle();
  };

  const links = (
    <List
    key={'pricipal-list'}
    subheader={
      <ListSubheader className={classes.subheader}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={'Market Audit'} />
      </ListSubheader>
    }
    >
      {
        menuRoutes.map((menu, key) => {
          if (menu.nested) {
            return (
              <React.Fragment key={key}>
                <ListItem
                  key={key}
                  button
                  onClick={() => handleExpandClick(key)}
                >
                  { menu.icon ? (<menu.icon className={classes.icon}/>) : null }
                  <ListItemText
                    primary={menu.title}
                  />
                  {expand[key] ? (<ExpandLess/>) : (<ExpandMore/>)}
                </ListItem>
                <Collapse
                  in={expand[key]}
                  timeout={'auto'}
                  unmountOnExit
                  className={classes.nested}
                >
                  <List
                    key={key}
                    disablePadding
                  >
                    {
                      menu.items.map((item, key) => {
                        return (
                          <ListItem
                            key={key}
                            {...{to: item.path}}
                            button
                            component={NavLink}
                            onClick={handleListItemClick}
                          >
                            { item.icon ? (<item.icon className={classes.icon}/>) : null }
                            <ListItemText
                              primary={item.label}
                            />
                          </ListItem>
                        );
                      })
                    }
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return menu.items.map((item, key) => {
              return (
                <ListItem
                  key={key}
                  {...{to: item.path}}
                  button
                  component={NavLink}
                  onClick={handleListItemClick}
                >
                  { item.icon ? (<item.icon className={classes.icon}/>) : null }
                  <ListItemText
                    primary={item.label}
                  />
                </ListItem>
              );
            });
          }
        })
      }
    </List>
  );

  return (
    <React.Fragment>
      <Drawer
        open={openSidebar}
        onClose={handleDrawerToggle}
        className={classes.drawer}
      >
        <div className={classes.list}>{links}</div>
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles(SideBarStyle)(SideBar);