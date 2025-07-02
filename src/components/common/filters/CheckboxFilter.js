import './CheckboxFilter.scss';
import React from 'react';
import { Button, List, Popover, ListItem, ListItemIcon, Checkbox, ListItemText, Divider,TextField,InputAdornment, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Search, ChevronLeft, ChevronRight } from '@material-ui/icons';

const CheckboxFilter = (props) => {
  const {title, itemList, setItemList,handleApplyFilters, selectedList, setSelectedList, className} = props;

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemListCompleted, setItemListCompleted] = React.useState([]);

  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = itemList.sort((a, b) => parseInt(a.key) - parseInt(b.key)).slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === 'next' && endIndex < itemList.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectItem = (id) => {
    const currentIndex = selectedList.indexOf(id);
    const newSelectedList = [...selectedList];

    if (currentIndex === -1) {
      newSelectedList.push(id);
    } else {
      newSelectedList.splice(currentIndex, 1);
    }

    setSelectedList(newSelectedList);
  }

  const handleClick = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleApply = () => {
    handleApplyFilters();
    setOpen(false);
  }

  const handleClean = () => {
    setSelectedList([]);
  }

  const initItemList = () =>
  {
    if (itemListCompleted && itemListCompleted.length === 0){
      setItemListCompleted(itemList);
    }
  }

  const handleSearchFilter = (filterText) => {
    initItemList();
    let options = itemListCompleted;
    if (filterText) {
      const result = options.filter(o => o.value.toLowerCase().includes(filterText.toLowerCase()));
      setItemList(result);
    } else if (filterText === '') {
      setItemList(options);
    }

    setCurrentPage(0);
  };

  return (
    <>
      <Button
        className={selectedList.length > 0 ? `${className} buttonWithFiler` : `${className} buttonFilter`}
        onClick={handleClick}
      >
        {title || ''}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleApply}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
           vertical: 'top',
           horizontal: 'right',
        }}
      >
        <List
          className='listFilter'
          dense
        >
          <TextField
              onChange={(e) => handleSearchFilter(e.target.value)}
              className='textField'
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search/></InputAdornment>
              }}
            />
        {
          paginatedItems.map((item, key) => (
            <ListItem
              className='listItem'
              key={key}
              button
              onClick={() => handleSelectItem(item.key)}
            >
              <ListItemIcon
                className='listItemIcon'
              >
                <Checkbox
                  className='checkboxItem'
                  size='small'
                  // onChange={() => handleSelectItem(item.key)}
                  checked={selectedList.indexOf(item.key) !== -1}
                  // tabIndex={-1}
                  // disableRipple={true}
                  style={{ color: '#003a60'}}
              />
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItem>
          ))
        }
        </List>
        <div className="paginationControls">
          <IconButton onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="body2">
            Pag. {currentPage + 1}/{Math.ceil(itemList.length / itemsPerPage)}
          </Typography>
          <IconButton onClick={() => handlePageChange('next')} disabled={endIndex >= itemList.length}>
            <ChevronRight />
          </IconButton>
          <Typography variant="body2" style={{ marginRight: '5px' }}>
            Total: {itemList.length}
          </Typography>
        </div>
        <Divider/>
        <div className='buttonsSection'>
          <Button
            className='cleanButton'
            onClick={handleClean}
          >
            LIMPIAR
          </Button>
          <Button
            className='applyButton'
            onClick={handleApply}
          >
            APLICAR
          </Button>
        </div>
      </Popover>
    </>
  );
}

CheckboxFilter.propTypes = {
  title: PropTypes.string,
  itemList: PropTypes.array,
  selectedList: PropTypes.array.isRequired,
  setSelectedList: PropTypes.func,
  handleApplyFilters: PropTypes.func.isRequired,
};

CheckboxFilter.defaultProps = {
  title: '',
  itemList: [],
  selectedList: [],
};

export default CheckboxFilter;
