import 'theme/styles/components/DefaultPageStyle.scss'; 
import React from 'react';
import useMangeProjects from './useMangeProjects';
import useProjects from './useProjects';
import {Grid, Card, CardContent, CardActions, Button, Divider, FormControl, IconButton} from '@material-ui/core';
import GenericProjectTable from './GenericProjectTable';
import UploadModal from './UploadModal';
import { useHistory } from 'react-router-dom';
import { routes } from 'app/Routes';
import MkSelect from 'components/common/select/MkSelect';
import MkDatePicker from 'components/common/datePicker/MkDatePicker';
import GenericModal from 'components/common/modal/GenericModal';
import MkTextField from '../../components/common/textField/MkTextField';
import { ArrowBackIos } from '@material-ui/icons';

const ManageProject = () => {
  const history = useHistory();
  
  const {
    openAddEditModal,
    handleCloseAddEditModal,
    projectFields,
    handleChangeValues,
    updateChangeDate,
    handleSaveAddEditModal,
    handleEditFromManagePage,
    downloadTemplatePDVs,
    downloadTemplateQuestions,
  } = useProjects();

  const {
    dataPdv,
    dataQuestions,
    loading,
    openMenu,
    handleOpenMenu,
    tabSelected,
    handleChangeTab,
    filtersPdv,
    filtersQuestions,
    openModalPdv,
    openModalQuestion,
    handleCloseDialogs,
    handleSaveQuestions,
    handleSavePdvs,
    projectToEdit,
    downloadFilePdv,
    downloadFileQuestions
  } = useMangeProjects();

  React.useEffect(() => {
    if (!(projectToEdit && projectToEdit.id)) {
      history.push(routes.project);      
    }
  }, []);


  return (
    <>
    <Grid className='grid'>
      {
        openMenu &&
        <Grid item xs={4} className='gridMenu'>
          {
            <Card className='card-data'>
              <CardContent className='card-content'>
                <div className='state-section'>
                  <div className='state'>
                  {
                    projectToEdit.statesList?.filter(x => x.key === projectToEdit.stateId)[0]?.value
                  }
                  </div>
                    <IconButton
                      onClick={handleOpenMenu}
                    >
                      <ArrowBackIos fontSize='small'/>
                    </IconButton>
                </div>
                <div className='name'>
                  {
                    projectToEdit?.name
                  }                
                </div>
                <div className='project'>
                  {
                    projectToEdit.projectTypeList?.filter(x => x.key === projectToEdit.projectTypeId)[0]?.value
                  }                
                </div>
                <div className='responsable'>
                  {
                    `Responsable: ${projectToEdit.responsableList?.filter(x => x.key === projectToEdit.responsableId)[0]?.value}`
                  }                
                </div>
                <div className='customer'>
                  {
                    `Cliente: ${projectToEdit.customerList?.filter(x => x.key === projectToEdit.customerId)[0]?.value}`
                  }                
                </div>
              </CardContent>
              <Divider></Divider>
              <CardActions className='card-actions'>
              {
                <Button
                  className='button'
                  onClick={() => handleEditFromManagePage(projectToEdit)}
                >
                  MODIFICAR DATOS
                </Button>
              }
              </CardActions>
            </Card>
          }
        </Grid>
      }
      <Grid className={openMenu ? 'gridTableMenuOpen' : 'gridTable'}>
        {
          tabSelected === 'pdv'
          ? (
            <GenericProjectTable
              tableTitle={projectToEdit.name || 'Proyecto'}
              handleOpenMenu={handleOpenMenu}
              openMenu={openMenu}
              data={dataPdv}
              showAddButton={false}
              showArrowButton={true}
              loading={loading}
              tabSelected={tabSelected}
              handleChangeTab={handleChangeTab}
              downloadFile={downloadFilePdv}
              filters={filtersPdv}
            />
          )
          : (
            <GenericProjectTable
              tableTitle={projectToEdit.name || 'Proyecto'}
              handleOpenMenu={handleOpenMenu}
              openMenu={openMenu}
              data={dataQuestions}
              showAddButton={false  }
              showArrowButton={false}
              loading={loading}
              tabSelected={tabSelected}
              handleChangeTab={handleChangeTab}
              downloadFile={downloadFileQuestions}
              filters={filtersQuestions}
            />
          )
        }
      </Grid>
    </Grid>
    <UploadModal
      title='Carga masiva de PDVs'
      contentText='Subir archivo XLSX con los PDVs del proyecto'
      // attahchFileName='PDV-Template'
      openDialog={openModalPdv}
      handleCloseDialog={handleCloseDialogs}
      handleSave={handleSavePdvs}
      downloadFile={downloadTemplatePDVs}
    />
    <UploadModal
      title='Carga masiva de preguntas'
      contentText='Subir archivo XLSX con las preguntas del proyecto'
      // attahchFileName='PDV-Template'
      openDialog={openModalQuestion}
      handleCloseDialog={handleCloseDialogs}
      handleSave={handleSaveQuestions}
      downloadFile={downloadTemplateQuestions}
    />
    <GenericModal
      title='EDITAR PROYECTO'
      openDialog={openAddEditModal}
      okName={'EDITAR PROYECTO'}
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
  </>
  );
}

export default ManageProject;
