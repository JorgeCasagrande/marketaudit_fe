import './ProjectPage.scss';
import React from 'react';
import { projectsTable, editProjectJson } from './DataMapper';
import {SaveEditProject, toggleEnable, deleteRow, getReport, deleteDuplicatePdvs} from './Request';
import CheckboxFilter from 'components/common/filters/CheckboxFilter';
import {ProjectContext} from '../../context/projects/ProjectProvider';
import {AppContext} from '../../context/app/AppContextProvider';
import TableButton from '../../components/common/buttons/tableButton/TableButton';
import { useHistory } from 'react-router-dom';
import { routes } from 'app/Routes';

const useProjects = () => {
	const history = useHistory();
  const {statuses, setStatuses, responsables, setResponsables, projectJson, projectEditId, setProjectEditId, setprojectToEdit} = React.useContext(ProjectContext);
  const {openSnackbar} = React.useContext(AppContext);

  const [data, setData] = React.useState({columns: [], data: []});
  const [loading, setLoading] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [clientSelectedList, setClientSelectedList] = React.useState([]);
  const [statusListFilter, setStatusListFilter] = React.useState([]);
  const [responsablesListFilter, setResponsablesListFilter] = React.useState([]);
  const [openAddEditModal, setOpenAddEditModal] = React.useState(false);

  const [projectFields, setProjectFields] = React.useState({});

  const [openAreYouSureDialogEnable, setOpenAreYouSureDialogEnable] = React.useState(false);
  const [openAreYouSureDialogDelete, setOpenAreYouSureDialogDelete] = React.useState(false);
  const [openAreYouSureDialogLoadData, setOpenAreYouSureDialogLoadData] = React.useState(false);
  const [openAreYouSureDialogDeleteDuplicatePdvs, setOpenAreYouSureDialogDeleteDuplicatePdvs] = React.useState(false);

  const handleGetModelToEdit = async() => {
    const editProject = await editProjectJson(clientSelectedList[0]);
    handleOpenAddEditModal(editProject);
  };

  const handleEditFromManagePage = async(editProject) => {
    // const editProject = await editProjectJson(clientSelectedList[0]);
    handleOpenAddEditModal(editProject);
  };

  const handleToggleEnable = async () => {
    await toggleEnable(clientSelectedList).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        setClientSelectedList([]);
        openSnackbar('Estado cambiado', 'success');
      } else if (response.status === 200 && response.data.status === 'Validation') {
          setOpenAreYouSureDialogLoadData(true);
      } else {
        openSnackbar('Algo salio mal.Intentelo de nuevo', 'error');
      }
    }).catch(e => {
      openSnackbar(e.message, 'error');
    });
    handleCloseAreYouSureDialog();
  };

  const handleDelete = async () => {
    await deleteRow(clientSelectedList).then((response) => {
      debugger;
      if (response.data.status === "OK") {
        loadData();
        setClientSelectedList([]);
        openSnackbar('proyecto eliminado', 'success');
      } else {
        openSnackbar('Algo salio mal.Intentelo de nuevo', 'error');
      }
    }).catch(e => {
      openSnackbar(e.message, 'error');
    });
    handleCloseAreYouSureDialog();
  };

  const handleDeleteDuplicatePdvs = async () => {
    setLoadingModal(true);
    await deleteDuplicatePdvs(clientSelectedList[0]).then((response) => {
      
      if (response.status === 200 && response.data.status === 'OK') {
        setLoadingModal(false);
        loadData();
        setClientSelectedList([]);
        openSnackbar('Pdvs duplicados eliminados correctamente', 'success');
      } else {
        setLoadingModal(false);
        openSnackbar('Algo salio mal.Intentelo de nuevo', 'error');
      }
    }).catch(e => {
      setLoadingModal(false);
      openSnackbar(e.message, 'error');
    });
    handleCloseAreYouSureDialog();
  };

  const handleDialogEnableAction = () => {
    setOpenAreYouSureDialogEnable(true);
  };

  const handleDialogDeleteAction = () => {
    setOpenAreYouSureDialogDelete(true);
  };

  const handleDialogDeleteDuplicatePdvAction = () => {
    setOpenAreYouSureDialogDeleteDuplicatePdvs(true);
  };

  const handleCloseAreYouSureDialog = () => {
    setOpenAreYouSureDialogEnable(false);
    setOpenAreYouSureDialogDelete(false);
    setOpenAreYouSureDialogDeleteDuplicatePdvs(false);
  };

  const handleEditProject = async() => {
    setLoading(true);
    setOpenAreYouSureDialogLoadData(false);
    const editProject = await editProjectJson(clientSelectedList[0]);
    const editProjectId = clientSelectedList[0];
    setProjectEditId(editProjectId);
    setprojectToEdit(editProject);
    history.push(routes.manageProject);
  };

  const tableActions = () => (
    <div>
      <TableButton
        title='MODIFICAR'
        disabled={clientSelectedList.length !== 1 || loading}
        onClick={handleGetModelToEdit}
      />
      <TableButton
        title='ELIMINAR'
        disabled={clientSelectedList.length < 1  || loading}
        onClick={handleDialogDeleteAction}
      />
      <TableButton
        title='HABILITAR/DESHABILITAR'
        disabled={clientSelectedList.length !== 1  || loading}
        onClick={handleDialogEnableAction}
      />
      <TableButton
        title='Cargar'
        disabled={clientSelectedList.length !== 1  || loading}
        onClick={handleEditProject}
      />
      <TableButton
        title='Eliminar PDVs duplicados'
        disabled={clientSelectedList.length !== 1  || loading}
        onClick={handleDialogDeleteDuplicatePdvAction}
      />
    </div>
  );

  React.useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const handleApplyFilters = () => {
    setLoading(true);
    setClientSelectedList([]);
    loadData();
  };

  const filters = () => (
    <div className='filterSection'>
      <CheckboxFilter
        className='filter-state'
        key={'filter-1'}
        title='Estado'
        itemList={statuses}
        setItemList={setStatuses}
        selectedList={statusListFilter}
        setSelectedList={setStatusListFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <CheckboxFilter
        key={'filter-2'}
        title='Responsables'
        itemList={responsables}
        setItemList={setResponsables}
        selectedList={responsablesListFilter}
        setSelectedList={setResponsablesListFilter}
        handleApplyFilters={handleApplyFilters}
      />
    </div>
  );

  const formatData = array => {
    array.data.foreach((item, key) => {
      item.check = false;
    });
  };

  const loadData = async() => {
    let result = await projectsTable(statusListFilter, responsablesListFilter);
    formatData(result);
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  const handleOpenAddEditModal = (projectModel) => {
    if (projectModel) {
      setProjectFields({...projectModel});
    } else {
      setProjectFields({...projectJson});
    }
    setOpenAddEditModal(true);
  };

  const clearFields = () => {
    setProjectFields({});
  };

  const handleCloseAddEditModal = () => {
    clearFields();
    setOpenAddEditModal(false);
  };

  const handleSaveAddEditModal = async () => {
    await SaveEditProject(projectFields).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        openSnackbar('Proyecto guardado correctamente', 'success');
        loadData();
        setprojectToEdit(projectFields);
      } else {
        openSnackbar('Algo salio mal intentelo de nuevo', 'error');
      }
    }).catch((e) => {
      openSnackbar(e.message, 'error');
    });
    handleCloseAddEditModal();
    setClientSelectedList([]);
  };

  const downloadFile = async() => {
    return await getReport();
  };

  const handleChangeValues = (name, value) => {
    setProjectFields(p => ({...p, [name]: value}));
  }

  const updateChangeDate = (date, name) => {
    let json = {...projectFields};
    json[name] = date;

    if (name === 'startDate') {
      if (new Date(json.startDate) > new Date(json.finishDate)) {
        json.finishDate = json.startDate;
      }
    }

    if (name === 'finishDate') {
      if (new Date(json.finishDate) < new Date(json.startDate)) {
        json.startDate = json.finishDate;
      }
    }
    
    setProjectFields(json);
  };

  const handleCloseLoadDataAreYouSureDialog = () => {
    setOpenAreYouSureDialogLoadData(false);
  }

  return {
    data,
    loading,
    loadingModal,
    filters,
    tableActions,
    openAddEditModal,
    handleOpenAddEditModal,
    handleCloseAddEditModal,
    clientSelectedList,
    setClientSelectedList,
    projectFields,
    handleChangeValues,
    updateChangeDate,
    handleSaveAddEditModal,
    openAreYouSureDialogEnable,
    openAreYouSureDialogDelete,
    handleToggleEnable,
    handleDelete,
    handleCloseAreYouSureDialog,
    downloadFile,
    projectEditId,
    handleEditFromManagePage,
    openAreYouSureDialogLoadData,
    handleCloseLoadDataAreYouSureDialog,
    handleEditProject,
    handleDeleteDuplicatePdvs,
    openAreYouSureDialogDeleteDuplicatePdvs
  }

}

export default useProjects;
