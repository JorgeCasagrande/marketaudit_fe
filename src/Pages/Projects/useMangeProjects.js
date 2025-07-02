import './ProjectPage.scss';
import React from 'react';
import { questionTable, pdvsTable } from './DataMapper';
import { getReport, importQuestions, importPdvs, getPdvReport, getQuestionReport, getPDVTemplate, getQuestionTemplate} from './Request';
import {ProjectContext} from '../../context/projects/ProjectProvider';
import {AppContext} from '../../context/app/AppContextProvider';
import TableButton from '../../components/common/buttons/tableButton/TableButton';
import FileSaver from 'file-saver';

const useMangeProjects = () => {
  const {projectEditId, projectToEdit} = React.useContext(ProjectContext);
  const {openSnackbar} = React.useContext(AppContext);

  const [openMenu, setOpenMenu] = React.useState(true);
  const [dataPdv, setDataPdv] = React.useState({columns: [], data: []});
  const [dataQuestions, setDataQuestions] = React.useState({columns: [], data: []});
  const [loading, setLoading] = React.useState(false);
  const [tabSelected, setTabSelected] = React.useState('pdv');

  const [openModalPdv, setOpenModalPdv] = React.useState(false);
  const [openModalQuestion, setOpenModalQuestion] = React.useState(false);

  const handleOpenMenu = () => { setOpenMenu(!openMenu) };

  const handleChangeTab = (value) => { setTabSelected(value); }

  const handleCloseDialogs = () => {
    setOpenModalPdv(false);
    setOpenModalQuestion(false);
  }

  const loadData = async() => {
    let resultpdv = await pdvsTable(projectEditId);
    let resultQuestions = await questionTable(projectEditId);
    if (resultpdv && resultQuestions) {
      setDataPdv(resultpdv);
      setDataQuestions(resultQuestions);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const filtersPdv = () => (
    <div className='filterSection'>
      <TableButton
        title='CARGAR PDVs'
        onClick={() => setOpenModalPdv(true)}
      />
    </div>
  );

  const filtersQuestions = () => (
    <div className='filterSection'>
      <TableButton
        title='CARGAR PREGUNTAS'
        onClick={() => setOpenModalQuestion(true)}
        disabled={projectToEdit.stateId !== 1}
      />
    </div>
  );

  const downloadFile = async() => {
    return await getReport();
  };

    const handleSaveQuestions = async(files) => {
    await importQuestions(projectEditId, files).then(response => {
      if (response.status === 200 && response.data.status === 'Ok') {
        loadData();
        openSnackbar('El archivo se subio correctamente.', 'success');
        handleCloseDialogs();
      } else {
        openSnackbar(response.data.message, 'error');
        handleCloseDialogs();
      }
    }).catch(e => {
      openSnackbar(e.response.data.message, 'error');
      handleCloseDialogs();
    });
  };

  const handleSavePdvs = async(files) => {
  await importPdvs(projectEditId, files).then(response => {
    if (response.status === 200 && response.data.status === 'Ok') {
      loadData();
      openSnackbar('El archivo se subio correctamente.', 'success');
      handleCloseDialogs();
    } else {
      openSnackbar(response.data.message, 'error');
      handleCloseDialogs();
    }
  }).catch(e => {
    openSnackbar(e.response.data.message, 'error');
    handleCloseDialogs();
  });
};

const downloadFilePdv = async() => {
  return await getPdvReport(projectEditId);
};

const downloadFileQuestions = async() => {
  return await getQuestionReport(projectEditId);
};

const downloadTemplatePDVs = async() => {
  await getPDVTemplate().then(response => {
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'PDVs.xlsx');
  });
};

const downloadTemplateQuestions = async() => {
  await getQuestionTemplate().then(response => {
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Preguntas.xlsx');
  });
};

  return {
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
    downloadFile,
    handleSaveQuestions,
    handleSavePdvs,
    projectToEdit,
    downloadFilePdv,
    downloadFileQuestions,
    downloadTemplatePDVs,
    downloadTemplateQuestions,
  }

}

export default useMangeProjects;
