import React, { useState, useEffect } from 'react';
import { withStyles, List, ListSubheader, ListItemText, InputAdornment, TextField, ListItem, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { ArrowBackIos, Search } from '@material-ui/icons';
import ListFilterStyle from 'theme/styles/components/ListFilterStyle';
import {defaultUrl} from 'constants/constants';
import CustomProgress from 'components/common/customProgress/CustomProgress';

const ListFilter = (props) => {
  const { title, list, handleOpenMenu, handleItemClick, classes, loading } = props;
  const [listData, setListData] = useState(list);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setListData(list)
  }, [list]);

  const handleFilter = (e) => {
    let options = [...list];
    if (e.target.value) {
      const result = options.filter(o => o.value.toLowerCase().startsWith(e.target.value.toLowerCase()));
      setListData(result);
    } else {
      setListData(options);
    }    
  };

  const handleClick = (id, key) => {
    handleItemClick(id);
    setSelectedIndex(key);
  };

  const options = (
    <List
      className={classes.list}
      subheader={
        <ListSubheader component={'div'} className={classes.subHeader}>
          <ListItem className={classes.bottomBorder}>
          <ListItemText primary={title} className={classes.defaultColor} />
          <ListItemSecondaryAction className={classes.secondaryIcon}>
            <IconButton
              onClick={handleOpenMenu}
            >
            <ArrowBackIos/>
            </IconButton>
          </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={classes.bottomBorder}>
          <TextField
            onChange={handleFilter}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search/></InputAdornment>
            }}
          />
          </ListItem>
        </ListSubheader>
      }
    >
      {
        listData.map((item, key) => {
          return (
            <ListItem
            key={key}
            button
            onClick={() => handleClick(item.id, key)}
            selected={selectedIndex === key}
            >
              {
                item.icon &&
                <img alt='' src={`${defaultUrl}/${item.icon}`} className={classes.iconOption} />
              }
              <ListItemText
                primary={item.value}
                className={classes.itemColor}
              />
            </ListItem>
          )
        })
      }
    </List>
  );

  return (
    <div>
      {loading ? <CustomProgress loading={loading}/> : options}
    </div>
  );
};

 export default withStyles(ListFilterStyle)(ListFilter);