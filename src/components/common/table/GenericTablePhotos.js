import 'theme/styles/components/GenericTableStyle.scss';
import React from 'react';
import {
  Button, Table, Toolbar,
  ListItem, ListItemText, TextField, InputAdornment, Fab, TablePagination, TableContainer, Divider, FormControl
} from '@material-ui/core';
import { Search, ArrowForwardIos, Add } from '@material-ui/icons';
import CustomProgress from 'components/common/customProgress/CustomProgress';
import DownloadPhotosButton from 'components/common/buttons/DownloadPhotosButton';
import useFilterHook from '../../Hooks/useFilterHook';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import GenericModal from 'components/common/modal/GenericModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const GenericTablePhotos = (props) => {
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
    filters,
    tableActions,
    checkBoxList,
    setCheckBoxList,
    filterField,
    containsCheck
  } = props;

  const [dataTable, setDataTable] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [searchText, setSearchText] = React.useState('');
  const [openModal, setopenModal] = React.useState(false);
  const [imgSelected, setImgSelected] = React.useState('');
  const [pdvSelected, setPdvSelected] = React.useState('');
  const [userSelected, setUserSelected] = React.useState('');
  const [questionSelected, setQuestionSelected] = React.useState('');

  const setFilterData = (rowsData) => {
    const dataAux = { ...dataTable };
    dataAux.data = [...rowsData];
    setDataTable(dataAux);
  };

  const classes = useStyles();

  const { handleFilterHook } = useFilterHook(filterField, data, setFilterData, checkBoxList, setCheckBoxList, null, page, rowsPerPage, dataTable);

  React.useEffect(() => {
    setDataTable(data);
  }, [data]);

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (containsCheck) {
    }
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseAddEditModal = () => {
    setImgSelected('');
    setUserSelected('');
    setPdvSelected('');
    setopenModal(false);
  };

  const handleOpenModal = (event) => {
    setImgSelected(event.img);
    setUserSelected(event.author);
    setPdvSelected(event.title);
    setQuestionSelected(event.question);
    setopenModal(true);
  }

  const table = (
    <div className='tableWrapper'>
      <TableContainer className='tableContainer'>
        <Table stickyHeader>
          <GridList cols={4} className={classes.gridList}>
            <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
              {/* <ListSubheader component="div">December</ListSubheader> */}
            </GridListTile>
            {dataTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tile) => (
              <GridListTile key={tile.id}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>Censista: {tile.author} Pregunta: {tile.question}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={(e) => handleOpenModal(tile)}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 15, 25, 100]}
        component="div"
        count={dataTable.length || 0}
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
          <ArrowForwardIos />
        </Fab>
      }
      <Toolbar className='toolbar'>
        <ListItem className='bottomBorder leftSpace'>
          <ListItemText primary={tableTitle} />
          {
            tableActions
            && (
              <div className='tableActions'>
                <Divider className='divider' orientation='vertical' flexItem />
                {
                  tableActions()
                }
              </div>
            )
          }
          {
            downloadFile
            && (
              <DownloadPhotosButton
                downloadOnClick={downloadFile}
              />
            )
          }
        </ListItem>
        <ListItem className='tableToolBar leftSpace'>
          <div>
            <TextField
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
              }}
            />
            <Button
              onClick={() => handleFilterHook(searchText)}
              className='filter-button'
            >
              Buscar
          </Button>
          </div>
          {
            filters && filters()
          }
        </ListItem>
      </Toolbar>
      {loading ? <CustomProgress loading={loading} /> : table}
      <GenericModal
        title={userSelected + ' - ' + pdvSelected + ' - ' + questionSelected}
        openDialog={openModal}
        cancelName='Cerrar'
        handleOk={handleCloseAddEditModal}
        handleCloseDialog={handleCloseAddEditModal}
        isOkButtonDisabled={true}
        size='md'
      >
        <div className='project-form'>
          <FormControl fullWidth>
            <img alt='' src={imgSelected} />
          </FormControl>
        </div>
      </GenericModal>
    </>
  );
};

export default GenericTablePhotos;
