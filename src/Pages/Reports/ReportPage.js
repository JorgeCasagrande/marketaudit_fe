import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Divider, Snackbar, IconButton } from '@material-ui/core';
import 'theme/styles/components/DefaultPageStyle.scss';
import { missionsList, dataTable } from './DataMapper';
import ListFilter from 'components/common/lists/ListFilter';
import GenericTable from 'components/common/table/GenericTable';
import { Close } from '@material-ui/icons';
import {getReport} from 'api/CommonRequest';
import reportSettings from 'constants/reportSettings';

const ReportPage = (props) => {
  const [list, setList] = useState([]);
  const [openMenu, setOpenMenu] = useState(true);
  const [data, setData] = useState({columns: [], data: []});
  const [missionId, setMissionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [loadingListFilter, setLoadingListFilter] = useState(false);

  useEffect(() => {
    setLoadingListFilter(true);
    loadMissions();
  }, []);

  useEffect(() => {
    if (missionId > 0) {
      loadData();
    }
  }, [missionId]);

  const loadMissions = async() => { setList(await missionsList()); setLoadingListFilter(false); };
  const loadData = async() => { setData(await dataTable(missionId)); setLoading(false); };
  const handleOpenMenu = () => { setOpenMenu(!openMenu) };
  const handleReportClick  = (id) => { setLoading(true); setMissionId(id); };

  const downloadFile = async() => {
    if (missionId === 0) {
      return;
    }
    return await getReport(
      reportSettings.informeAuditoria.report,
      reportSettings.informeAuditoria.reportName,
      missionId
    );
  };

  return (
    <>
      <Grid className='grid'>
        {
          openMenu &&
          <Grid item xs={4} className='gridMenu'>
          <ListFilter
            title='Informe de auditoria'
            list={list}
            handleOpenMenu={handleOpenMenu}
            handleItemClick={handleReportClick}
            loading={loadingListFilter}
          />
          <Divider></Divider>
        </Grid>
        }
        <Grid className={openMenu ? 'gridTableMenuOpen' : 'gridTable'}>
          <GenericTable
            tableTitle='Reportes'
            handleOpenMenu={handleOpenMenu}
            openMenu={openMenu}
            data={data}
            showAddButton={false}
            showArrowButton={true}
            loading={loading}
            missionId={missionId}
            downloadFile={downloadFile}
            containsCheck={false}
          />
        </Grid>
      </Grid>
      {
        snackBarMessage &&
        <Snackbar
          open={snackBarMessage !== ''}
          autoHideDuration={6000}
          message={snackBarMessage}
          onclose={() => setSnackBarMessage('')}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              className='close'
              onClick={setSnackBarMessage('')}
            >
              <Close />
            </IconButton>
          }
      />
      }
    </>
  );
};

export default withRouter((ReportPage));
