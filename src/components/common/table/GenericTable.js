import 'theme/styles/components/GenericTableStyle.scss';
import React from 'react';
import { Table, TableRow, TableBody, TableCell, TableHead, Toolbar,
ListItem, ListItemText, TextField, InputAdornment, Fab, Link, TablePagination, TableContainer, Divider, Checkbox } from '@material-ui/core';
import { Search, ArrowForwardIos, Add, CheckBox as CheckBoxIcon } from '@material-ui/icons';
import CustomProgress from 'components/common/customProgress/CustomProgress';
import {amazonImagesUrl} from 'constants/constants';
import DownloadButton from 'components/common/buttons/DownloadButton';
import PropTypes from 'prop-types';
import useFilterHook from '../../Hooks/useFilterHook';

const GenericTable = (props) => {
  const {
    showArrowButton,
    openMenu,
    showAddButton,
    handleOpenMenu,
    data,
    loading,
    tableTitle,
    handleOpenDialog,
    missionId,
    downloadFile,
    areThereActions,
    filters,
    tableActions,
    checkBoxList,
    setCheckBoxList,
    containsCheck
   } = props;
   
  const [dataTable, setDataTable] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [checkedAll, setCheckedAll] = React.useState(false);

  const setFilterData = (rowsData) => {
    const dataAux = {...dataTable};
    dataAux.data = [...rowsData];
    setDataTable(dataAux);
  };

  const {handleFilterHook, handleSelectRow, handleSelectAllRow, resetCheckList} = useFilterHook(data.data, setFilterData, checkBoxList, setCheckBoxList, setCheckedAll, page, rowsPerPage, dataTable.data, containsCheck);

  React.useEffect(() => {
    setDataTable(data);
  }, [data]);

  const getCells = (item) => {
    const result = [];

    if (item && item.actions) {
      result.push(
        <TableCell
          key='actions'
        >
          {item.actions}
        </TableCell>
      )
    }

    Object.entries(item).forEach(([key, value]) => {
      if ((key === 'actions' && typeof value === 'object') || key === 'check' ) {
        return;
      }
      if (typeof value === 'object') {
        result.push(
          <TableCell key={key}>{value}</TableCell>
        )
      } else if (!value || typeof value === 'number' || !value.startsWith(amazonImagesUrl)) {
        result.push(
          <TableCell key={key}>{value}</TableCell>
        );
      } else {
        const links = [];
        value.split('|').forEach(item => {
          links.push(
            <Link
              key={item}
              target='_blank'
              href={item}
            >
              {item + ' '}
            </Link>
          )
        });
        result.push(
          <TableCell key={key}>{links}</TableCell>
        );
      }
    })
    return result;
  }

  const handleChangePage = (event, newPage) => {
    if (containsCheck){
      resetCheckList();
    }
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (containsCheck){
      resetCheckList();
    }
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = (e) => {
    handleFilterHook(e.target.value)
  };

  const table = (
    <div className='tableWrapper'>
      <TableContainer className='tableContainer'>
        <Table stickyHeader>
          <TableHead className='tableHead'>
            <TableRow
              hover
            >
              {
                tableActions && handleSelectAllRow
                && (
                  <TableCell>
                    <Checkbox
                      onChange={(event) => handleSelectAllRow(event.target.checked)}
                       checkedIcon={<CheckBoxIcon className="checkbox-icon-checked-style" />}
                       checked={checkedAll}
                    />
                  </TableCell>
                )
              }
              {
                areThereActions
                && (
                  <TableCell key='actionHead'>ACCIONES</TableCell>
                )
              }
              {
                dataTable.columns.map((column, key) => {
                  return (
                  <TableCell key={key}>{column}</TableCell>
                  );
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              dataTable.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, key) => {
                return (
                  <TableRow
                    className='table-row-generic'
                    key={key}
                    hover
                    onClick={(event) => handleSelectRow(item.id)}
                  >
                    {
                      tableActions && handleSelectRow
                      && (
                        <TableCell>
                          <Checkbox
                            checked={item.check}
                            onChange={() => handleSelectRow(item.id)}
          									checkedIcon={<CheckBoxIcon className="checkbox-icon-checked-style" />}
                          />
                        </TableCell>
                      )
                    }
                    {
                      getCells(item)
                    }
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 15, 25, 100]}
        component="div"
        count={dataTable.data.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage='Filas por pagina'
      />
    </div>
  );

  return (
    <>
      {
        showAddButton &&
        <Fab
          onClick={() => handleOpenDialog()}
          className='addIcon'
          disabled={missionId < 1}
        >
          <Add />
        </Fab>
      }
      {
        showArrowButton && !openMenu &&
        <Fab onClick={handleOpenMenu} className='arrowIcon' size='small'>
          <ArrowForwardIos/>
        </Fab>
      }
      <Toolbar className='toolbar'>
        <ListItem className='bottomBorder leftSpace'>
          <ListItemText primary={tableTitle} />
          {
            tableActions
            && (
              <div className='tableActions'>
                <Divider className='divider' orientation='vertical' flexItem/>
                {
                  tableActions()
                }
              </div>
            )
          }
          {
            downloadFile
            && (
              <DownloadButton
                downloadOnClick={downloadFile}
              />
            )
          }
        </ListItem>
        <ListItem className='tableToolBar leftSpace'>
          <div>
            <TextField
              onChange={handleFilter}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search/></InputAdornment>
              }}
            />
          </div>
          {
            filters && filters()
          }
        </ListItem>
      </Toolbar>
      {loading ? <CustomProgress loading={loading}/> : table}
    </>
  );
};

GenericTable.propTypes = {
  areThereActions: PropTypes.bool,
  filters: PropTypes.func,
  tableActions: PropTypes.func
};

GenericTable.defaultProps = {
  areThereActions: false,
  filters: undefined,
  tableActions: undefined,
  containsCheck: true
};

export default GenericTable;
