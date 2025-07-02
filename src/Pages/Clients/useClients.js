import './ClientPage.scss';
import React from 'react';
import { customersTable, editCustomerJson } from './DataMapper';
import {SaveEditCustomer, toggleEnable, deleteRow, getReport} from './Request';
import CheckboxFilter from 'components/common/filters/CheckboxFilter';
import {ClientContext} from '../../context/clients/ClientProvider';
import {AppContext} from '../../context/app/AppContextProvider';
import TableButton from '../../components/common/buttons/tableButton/TableButton';

const useClients = () => {

  const {statuses, customerJson} = React.useContext(ClientContext);
  const {openSnackbar} = React.useContext(AppContext);

  const [data, setData] = React.useState({columns: [], data: []});
  const [loading, setLoading] = React.useState(false);
  const [clientSelectedList, setClientSelectedList] = React.useState([]);
  const [statusListFilter, setStatusListFilter] = React.useState([]);
  const [openAddEditModal, setOpenAddEditModal] = React.useState(false);

  const [customerId, setCustomerId] = React.useState(0);
  const [customerName, setCustomerName] = React.useState('');
  const [customerDescription, setCustomerDescription] = React.useState('');
  const [customerImage, setCustomerImage] = React.useState([]);

  const [openAreYouSureDialogEnable, setOpenAreYouSureDialogEnable] = React.useState(false);
  const [openAreYouSureDialogDelete, setOpenAreYouSureDialogDelete] = React.useState(false);

  const handleGetModelToEdit = async() => {
    const editUser = await editCustomerJson(clientSelectedList[0]);
    handleOpenAddEditModal(editUser);
  };

  const handleToggleEnable = async () => {
    await toggleEnable(clientSelectedList).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        setClientSelectedList([]);
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
    await deleteRow(clientSelectedList).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        setClientSelectedList([]);
        openSnackbar('Cliente eliminado', 'success');
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
        disabled={clientSelectedList.length !== 1}
        onClick={handleGetModelToEdit}
      />
      <TableButton
        title='ELIMINAR'
        disabled={clientSelectedList.length < 1}
        onClick={handleDialogDeleteAction}
      />
      <TableButton
        title='HABILITAR/DESHABILITAR'
        disabled={clientSelectedList.length !== 1}
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
    setClientSelectedList([]);
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
    array.data.map((item, key) => {
      item.check = false;
      // item.enable = item.enable ? 'Habilitado' : 'Deshabilitado';
    });
  };

  const loadData = async() => {
    let result = await customersTable(statusListFilter);
    formatData(result);
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  const handleOpenAddEditModal = (userModel) => {
    if (userModel) {
      setCustomerId(userModel.id);
      setCustomerName(userModel.name);
      setCustomerDescription(userModel.description);
    };
    setOpenAddEditModal(true);
  };

  const clearFields = () => {
    setCustomerId(0);
    setCustomerName('');
    setCustomerDescription('');
    setCustomerImage([]);
  };

  const handleCloseAddEditModal = () => {
    clearFields();
    setOpenAddEditModal(false);
  };

  const handleSaveAddEditModal = async () => {
    const json = {...customerJson};
    json.id = customerId;
    json.name = customerName;
    json.description = customerDescription;

    await SaveEditCustomer(json).then((response) => {
      if (response.status === 200 && response.data.status === 'Ok') {
        openSnackbar('Cliente guardado correctamente', 'success');
        loadData();
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

  return {
    data,
    loading,
    filters,
    tableActions,
    openAddEditModal,
    handleOpenAddEditModal,
    handleCloseAddEditModal,
    clientSelectedList,
    setClientSelectedList,
    customerId,
    customerName,
    setCustomerName,
    customerDescription,
    setCustomerDescription,
    customerImage,
    setCustomerImage,
    handleSaveAddEditModal,
    openAreYouSureDialogEnable,
    openAreYouSureDialogDelete,
    handleToggleEnable,
    handleDelete,
    handleCloseAreYouSureDialog,
    downloadFile,
  }

}

export default useClients;
