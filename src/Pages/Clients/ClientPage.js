import './ClientPage.scss';
import 'theme/styles/components/DefaultPageStyle.scss';
import React from 'react';
import GenericTable from 'components/common/table/GenericTable';
import { Grid, FormControl } from '@material-ui/core';
import GenericModal from 'components/common/modal/GenericModal';
import useClients from './useClients';
import MkTextField from '../../components/common/textField/MkTextField';
import {DropzoneArea} from 'material-ui-dropzone'
import AreYouSureDialog from '../../components/common/dialogs/AreYouSureDialog';

const ClientPage = (props) => {
  const {
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
    setCustomerImage,
    handleSaveAddEditModal,
    openAreYouSureDialogEnable,
    openAreYouSureDialogDelete,
    handleToggleEnable,
    handleDelete,
    handleCloseAreYouSureDialog,
    downloadFile,
  } = useClients();

  return (
    <>
      <Grid className='grid'>
        <Grid className='gridTable'>
          <GenericTable
            showArrowButton={false}
            showAddButton={true}
            handleOpenDialog={handleOpenAddEditModal}
            data={data}
            loading={loading}
            tableTitle='Clientes'
            areThereActions={false}
            filters={filters}
            tableActions={tableActions}
            downloadFile={downloadFile}
            checkBoxList={clientSelectedList}
            setCheckBoxList={setClientSelectedList}
            filterField='name'
          />
        </Grid>
    </Grid>
    <GenericModal
      title='Nuevo Cliente'
      openDialog={openAddEditModal}
      okName={customerId === 0 ? 'CREAR CLIENTE' : 'EDITAR CLIENTE'}
      cancelName='CANCELAR'
      handleOk={handleSaveAddEditModal}
      handleCloseDialog={handleCloseAddEditModal}
      isOkButtonDisabled={!customerName || !customerDescription || customerName.length < 4 || customerDescription.length < 4}
      size='md'
    >
      <div className='user-form'>
        <FormControl fullWidth>
          <MkTextField value={customerName} onChange={(e) => setCustomerName(e.target.value)} label='Nombre' margin='dense' className='text-field-input' />
          <MkTextField value={customerDescription} onChange={(e) => setCustomerDescription(e.target.value)} label='Descripción' margin='dense' className='text-field-input'/>
          <div className='drop-zone'>
            <DropzoneArea
              onChange={(files) => setCustomerImage(files)}
              filesLimit={1}
              dropzoneText='Arrastrar y soltar el archivo aquí o subir el archivo'
              showAlerts={false}
              showFileNames={true}
            />
          </div>
        </FormControl>
      </div>
    </GenericModal>
    <AreYouSureDialog
      open={openAreYouSureDialogEnable}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleToggleEnable}
      title='HABILITAR/DESHABILITAR'
      questionMessage='Estas seguro que quieres Habilitar/Deshabilitar el cliente?'
    />
    <AreYouSureDialog
      open={openAreYouSureDialogDelete}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleDelete}
      title='Eliminar'
      questionMessage='Estas seguro que quieres elimnar el cliente?'
    />
    </>
  )
};

export default ClientPage;
