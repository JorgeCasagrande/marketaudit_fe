import './UserPage.scss';
import React from 'react';
import { usersTable, editUserJson } from './DataMapper';
import {SaveEditUser, toggleEnable, deleteRow, getReport} from './Request';
import CheckboxFilter from 'components/common/filters/CheckboxFilter';
import {UserContext} from '../../context/users/UserProvider';
import {AppContext} from '../../context/app/AppContextProvider';
import TableButton from '../../components/common/buttons/tableButton/TableButton';

const useUsers = () => {

  const {statuses, userJson} = React.useContext(UserContext);
  const {openSnackbar} = React.useContext(AppContext);

  const [data, setData] = React.useState({columns: [], data: []});
  const [loading, setLoading] = React.useState(false);
  const [userSelectedList, setUserSelectedList] = React.useState([]);
  const [statusListFilter, setStatusListFilter] = React.useState([]);
  const [openAddEditModal, setOpenAddEditModal] = React.useState(false);

  const [userId, setUserId] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [userLastName, setUserLastName] = React.useState('');
  const [userUserName, setUserUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [hiddedPassword, setHiddedPassword] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const [userRoleId, setUserRoleId] = React.useState(0);
  const [userRolesList, setUserRolesList] = React.useState([]);
  const [userTest, setUserTest] = React.useState(false);

  const [openAreYouSureDialogEnable, setOpenAreYouSureDialogEnable] = React.useState(false);
  const [openAreYouSureDialogDelete, setOpenAreYouSureDialogDelete] = React.useState(false);

  const handleGetModelToEdit = async() => {
    const editUser = await editUserJson(userSelectedList[0]);
    handleOpenAddEditModal(editUser);
  };

  const handleToggleEnable = async () => {
    await toggleEnable(userSelectedList).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        setUserSelectedList([]);
        openSnackbar('Estado cambiado', 'success');
      } else {
        openSnackbar('Algo salio mal.Intentelo de nuevo', 'error');
      }
    }).catch(e => {
      openSnackbar(e.message, 'error');
    });
    handleCloseAreYouSureDialog();
  };

  const handleDelete = async () => {
    await deleteRow(userSelectedList).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        setUserSelectedList([]);
        openSnackbar('Usuario eliminado', 'success');
      } else {
        openSnackbar('Algo salio mal.Intentelo de nuevo', 'error');
      }
    }).catch(e => {
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

  const handleCloseAreYouSureDialog = () => {
    setOpenAreYouSureDialogEnable(false);
    setOpenAreYouSureDialogDelete(false);
  };


  const tableActions = () => (
    <div>
      <TableButton
        title='MODIFICAR'
        disabled={userSelectedList.length !== 1}
        onClick={handleGetModelToEdit}
      />
      <TableButton
        title='ELIMINAR'
        disabled={userSelectedList.length < 1}
        onClick={handleDialogDeleteAction}
      />
      <TableButton
        title='HABILITAR/DESHABILITAR'
        disabled={userSelectedList.length !== 1}
        onClick={handleDialogEnableAction}
      />
    </div>
  );

  React.useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const handleApplyFilters = () => {
    setLoading(true);
    setUserSelectedList([]);
    loadData();
  };

  const filters = () => (
    <div className='filterSection'>
      <CheckboxFilter
        title='Estado'
        itemList={statuses}
        selectedList={statusListFilter}
        setSelectedList={setStatusListFilter}
        handleApplyFilters={handleApplyFilters}
      />
    </div>
  );

  const formatData = array => {
    array.data.forEach((item) => {
      item.check = false;
    });
  };

  const loadData = async() => {
    let result = await usersTable(statusListFilter);
    formatData(result);
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  const handleOpenAddEditModal = (userModel) => {
    if (userModel) {
      setUserId(userModel.id);
      setUserName(userModel.name);
      setUserLastName(userModel.lastName);
      setUserUserName(userModel.userName);
      setUserPassword(userModel.password);
      setUserEmail(userModel.email);
      setUserRoleId(userModel.roleId);
      setUserRolesList(userModel.roleList);
      setUserTest(userModel.userTest);
    }
    else
    {
      setUserRolesList(userJson.roleList);
    };
    
    setOpenAddEditModal(true);
  };

  const clearFields = () => {
    setUserId(0);
    setUserName('');
    setUserLastName('');
    setUserUserName('');
    setUserPassword('');
    setUserEmail('');
    setUserRoleId(0);
    setUserTest(false);
  };

  const handleCloseAddEditModal = () => {
    clearFields();
    setOpenAddEditModal(false);
  };

  const handleSaveAddEditModal = async () => {
    const json = {...userJson};
    json.id = userId;
    json.name = userName;
    json.lastName = userLastName;
    json.userName = userUserName;
    json.password = userPassword;
    json.email = userEmail;
    json.roleId = userRoleId;
    json.userTest = userTest;
    await SaveEditUser(json).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        openSnackbar('Usuario guardado correctamente', 'success');
        loadData();
      } else {
        openSnackbar('Algo salio mal intentelo de nuevo', 'error');
      }
    }).catch((e) => {
      openSnackbar(e.message, 'error');
    });
    handleCloseAddEditModal();
  };

  const downloadFile = async() => {
    return await getReport();
  };

  return {
    data,
    loading,
    filters,
    tableActions,
    openAddEditModal,
    handleOpenAddEditModal,
    handleCloseAddEditModal,
    userSelectedList,
    setUserSelectedList,
    userId,
    userName,
    setUserName,
    userLastName,
    setUserLastName,
    userUserName,
    setUserUserName,
    userPassword,
    setUserPassword,
    hiddedPassword,
    setHiddedPassword,
    userEmail,
    setUserEmail, 
    userRoleId,
    setUserRoleId, 
    userRolesList,
    setUserRolesList,
    userTest,
    setUserTest,
    handleSaveAddEditModal,
    openAreYouSureDialogEnable,
    openAreYouSureDialogDelete,
    handleToggleEnable,
    handleDelete,
    handleCloseAreYouSureDialog,
    downloadFile,
  }

}

export default useUsers;
