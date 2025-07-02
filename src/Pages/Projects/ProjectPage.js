import './ProjectPage.scss';
import 'theme/styles/components/DefaultPageStyle.scss';
import React from 'react';
import GenericTable from 'components/common/table/GenericTable'
import { Grid, FormControl } from '@material-ui/core';
import GenericModal from 'components/common/modal/GenericModal';
import useProjects from './useProjects';
import MkTextField from '../../components/common/textField/MkTextField';
import AreYouSureDialog from '../../components/common/dialogs/AreYouSureDialog';
import MkSelect from 'components/common/select/MkSelect';
import MkDatePicker from 'components/common/datePicker/MkDatePicker';

const ProjectPage = (props) => {
  const {
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
    openAreYouSureDialogLoadData,
    handleCloseLoadDataAreYouSureDialog,
    handleEditProject,
    handleDeleteDuplicatePdvs,
    openAreYouSureDialogDeleteDuplicatePdvs
  } = useProjects();

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
            tableTitle='Proyecto'
            areThereActions={false}
            filters={filters}
            tableActions={tableActions}
            downloadFile={downloadFile}
            checkBoxList={clientSelectedList}
            setCheckBoxList={setClientSelectedList}
            filterField='name '
          />
        </Grid>
    </Grid>
    <GenericModal
      title={projectFields.id === 0 ? 'CREAR PROYECTO' : 'EDITAR PROYECTO'}
      openDialog={openAddEditModal}
      okName={projectFields.id === 0 ? 'CREAR PROYECTO' : 'EDITAR PROYECTO'}
      cancelName='CANCELAR'
      handleOk={handleSaveAddEditModal}
      handleCloseDialog={handleCloseAddEditModal}
      isOkButtonDisabled={!projectFields.name || !projectFields.projectTypeId || !projectFields.responsableId || !projectFields.customerId || projectFields.name < 4 || projectFields.projectTypeId < 1 || projectFields.responsableId < 1 || projectFields.customerId < 1}
      size='md'
    >
      <div className='project-form'>
        <FormControl fullWidth>
          <MkTextField value={projectFields.name || ''} onChange={(e) => handleChangeValues('name' ,e.target.value)} label='Nombre*' margin='dense' className='text-field-input' />
          <MkTextField value={projectFields.description || ''} onChange={(e) => handleChangeValues('description' ,e.target.value)} label='Descripción' margin='dense' className='text-field-input'/>
          <MkSelect
            label='Tipo de Proyecto*'
            classNameFormControl='text-field-input'
            value={ projectFields.projectTypeId || 0}
            options={ projectFields.projectTypeList || []}
            onChange={(e) => handleChangeValues('projectTypeId', e.target.value)}
          />
          <MkSelect
            label='Responsable*'
            classNameFormControl='text-field-input'
            value={ projectFields.responsableId || 0}
            options={ projectFields.responsableList || []}
            onChange={(e) => handleChangeValues('responsableId', e.target.value)}
          />
          <MkSelect
            label='Cliente*'
            classNameFormControl='text-field-input'
            value={ projectFields.customerId || 0}
            options={ projectFields.customerList || []}
            onChange={(e) => handleChangeValues('customerId', e.target.value)}
          />
          {/* <MkTextField value={projectFields.uob || ''} onChange={(e) => handleChangeValues('uob' ,e.target.value)} label='Unidad de Negocio' margin='dense' className='text-field-input' />
          <MkSelect
            label='Tamaño de Proyecto'
            classNameFormControl='text-field-input'
            value={ projectFields.sizeId || 0}
            options={ projectFields.sizeList || []}
            onChange={(e) => handleChangeValues('sizeId', e.target.value)}
          /> */}
          <div>
          <MkDatePicker
            label='Fecha de inicio*'
            name='startDate'
            className='date-picker date-picker-first'
            value={projectFields.startDate || new Date()}
            onChange={date => updateChangeDate(date, 'startDate')}
          />
          <MkDatePicker
            label='Fecha de fin*'
            name='finishDate'
            className='date-picker'
            value={projectFields.finishDate || new Date()}
            onChange={date => updateChangeDate(date, 'finishDate')}
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
      questionMessage='Estas seguro que quieres Habilitar/Deshabilitar el proyecto?'
    />
    <AreYouSureDialog
      open={openAreYouSureDialogDelete}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleDelete}
      title='Eliminar'
      questionMessage='Estas seguro que quieres elimnar el proyecto?'
    />
    <AreYouSureDialog
      open={openAreYouSureDialogDeleteDuplicatePdvs}
      cancelText='CANCELAR'
      handleCancel={handleCloseAreYouSureDialog}
      acceptText='ACEPTAR'
      handleAccept={handleDeleteDuplicatePdvs}
      title='Eliminar'
      loading={loadingModal}
      questionMessage='Estas seguro que quieres elimnar los Pdvs duplicados?'
    />

    <AreYouSureDialog
      open={openAreYouSureDialogLoadData}
      cancelText='CANCELAR'
      handleCancel={handleCloseLoadDataAreYouSureDialog}
      acceptText='CARGAR DATOS'
      handleAccept={handleEditProject}
      title='Habilitar Proyecto'
      questionMessage='Para poder habilitar este proyecto deberias cargar PDVs y preguntas'
    />
    </>
  )
};

export default ProjectPage;
