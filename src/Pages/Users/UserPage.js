import './UserPage.scss';
import 'theme/styles/components/DefaultPageStyle.scss';
import React from 'react';
import GenericTable from 'components/common/table/GenericTable'
import { Grid, FormControl,InputAdornment, IconButton, Checkbox, FormControlLabel } from '@material-ui/core';
import GenericModal from 'components/common/modal/GenericModal';
import useUsers from './useUsers';
import MkTextField from '../../components/common/textField/MkTextField';
import MkSelect from 'components/common/select/MkSelect';
import AreYouSureDialog from '../../components/common/dialogs/AreYouSureDialog';
import {Visibility, VisibilityOff } from '@material-ui/icons';

const UserPage = (props) => {
  const {
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
    userTest,
    setUserTest,
    handleSaveAddEditModal,
    openAreYouSureDialogEnable,
    openAreYouSureDialogDelete,
    handleToggleEnable,
    handleDelete,
    handleCloseAreYouSureDialog,
    downloadFile,
  } = useUsers();

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
            tableTitle='Usuarios'
            areThereActions={false}
            filters={filters}
            tableActions={tableActions}
            downloadFile={downloadFile}
            checkBoxList={userSelectedList}
            setCheckBoxList={setUserSelectedList}
            filterField='name'
          />
        </Grid>
    </Grid>
    <GenericModal
      title='Nuevo Usuario'
      openDialog={openAddEditModal}
      okName={userId === 0 ? 'CREAR USUARIO' : 'EDITAR USUARIO'}
      cancelName='CANCELAR'
      handleOk={handleSaveAddEditModal}
      handleCloseDialog={handleCloseAddEditModal}
      isOkButtonDisabled={!userName || !userLastName || userName.length < 1 || userLastName.length < 1 }
      size='md'
    >
      <div className='user-form'>
        <FormControl fullWidth>
          <MkTextField value={userName} onChange={(e) => setUserName(e.target.value)} label='Nombre' margin='dense' className='text-field-input' />
          <MkTextField value={userLastName} onChange={(e) => setUserLastName(e.target.value)} label='Apellido' margin='dense' className='text-field-input'/>
          <MkTextField value={userUserName} onChange={(e) => setUserUserName(e.target.value)} label='Usuario' margin='dense' className='text-field-input'/>
          <MkTextField 
          type={hiddedPassword ? 'password' : 'text'}
          value={userPassword || ''} 
          onChange={(e) => setUserPassword(e.target.value)}
          endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {setHiddedPassword(!hiddedPassword)}}
                >
                  {hiddedPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            } label='Password' margin='dense' className='text-field-input'/>
          <MkTextField value={userEmail} onChange={(e) => setUserEmail(e.target.value)} label='Email' margin='dense' className='text-field-input'/>   
          <MkSelect
                label='Rol'
                value={ userRoleId || 0}
                 options={ userRolesList || []}
                onChange={(e) => setUserRoleId(e.target.value)}
              />
        </FormControl>
      </div>
      <div>
        <FormControlLabel
          value="bottom"
          control={<Checkbox
            className='checkboxItem'
            size='small'
            margin='dense'
            onChange={(e) => setUserTest(e.target.checked)}
            checked={userTest}
            value={userTest}
          />}
          label="Usuario de Prueba"
          labelPlacement="end"
        />
      </div>
    </GenericModal>
    <AreYouSureDialog
      open={openAreYouSureDialogEnable}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleToggleEnable}
      title='HABILITAR/DESHABILITAR'
      questionMessage='Estas seguro que quieres Habilitar/Deshabilitar el usuario?'
    />
    <AreYouSureDialog
      open={openAreYouSureDialogDelete}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleDelete}
      title='Eliminar'
      questionMessage='Estas seguro que quieres elimnar el usuario?'
    />
    </>
  )
};

export default UserPage;
