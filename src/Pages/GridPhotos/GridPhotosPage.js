import React, { useState, useEffect } from 'react';
import { Grid, Divider, Button } from '@material-ui/core';
import 'theme/styles/components/DefaultPageStyle.scss';
import { missionsListSpecial, dataTable, filterListData } from './DataMapper';
import ListFilter from 'components/common/lists/ListFilter';
import GenericTablePhotos from 'components/common/table/GenericTablePhotos';
import { getReportPhotos } from 'api/CommonRequest';
import CheckboxFilter from 'components/common/filters/CheckboxFilter';

const GridPhotosPage = (props) => {
  const [list, setList] = useState([]);
  const [openMenu, setOpenMenu] = useState(true);
  const [data, setData] = useState([]);
  const [missionId, setMissionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingListFilter, setLoadingListFilter] = useState(false);
  const [filterData, setFilterData] = React.useState();
  const [userFilter, setUserFilter] = React.useState([]);
  const [pdvFilter, setPdvFilter] = React.useState([]);
  const [routeFilter, setRouteFilter] = React.useState([]);
  const [questionFilter, setQuestionFilter] = React.useState([]);
  const [userListFilter, setUserListFilter] = React.useState([]);
  const [pdvListFilter, setPdvListFilter] = React.useState([]);
  const [routeListFilter, setRouteListFilter] = React.useState([]);
  const [questionListFilter, setQuestionListFilter] = React.useState([]);

  useEffect(() => {
    setLoadingListFilter(true);
    loadMissions();
  }, []);

  useEffect(() => {
    if (missionId > 0)
    {
      loadData();
      loadFilter();
    }
  }, [missionId]);
  
  const filters = () => (
    <div className='filterSection'>
      <CheckboxFilter
        className='filter-state'
        key={'filter-1'}
        title='Censistas'
        itemList={userFilter}
        setItemList={setUserFilter}
        selectedList={userListFilter}
        setSelectedList={setUserListFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <CheckboxFilter
        key={'filter-2'}
        title='Pdvs'
        itemList={pdvFilter}
        setItemList={setPdvFilter}
        selectedList={pdvListFilter}
        setSelectedList={setPdvListFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <CheckboxFilter
        className='filter-state'
        key={'filter-3'}
        title='Rutas'
        itemList={routeFilter}
        setItemList={setRouteFilter}
        selectedList={routeListFilter}
        setSelectedList={setRouteListFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <CheckboxFilter
        key={'filter-4'}
        title='Preguntas'
        itemList={questionFilter}
        setItemList={setQuestionFilter}
        selectedList={questionListFilter}
        setSelectedList={setQuestionListFilter}
        handleApplyFilters={handleApplyFilters}
      />
    </div>
  );

  const loadMissions = async() => { setList(await missionsListSpecial()); setLoadingListFilter(false); };
  const loadData = async() => { setData(await dataTable(missionId,'','','','')); setLoading(false); };
  const loadDataFilter = async() => { setData(await dataTable(missionId, userListFilter, pdvListFilter, routeListFilter, questionListFilter)); setLoading(false); };

  const handleOpenMenu = () => { setOpenMenu(!openMenu) };
  const handleReportClick  = (id) => { setLoading(true); setMissionId(id); };

  const handleApplyFilters = () => {
    setLoading(true);
    loadDataFilter();
  };

  const loadFilter = async() => { 

    let listFilter = await filterList();
    setFilterData(listFilter); 
    if (listFilter) {
      setUserFilter(listFilter.users);
      setPdvFilter(listFilter.pdvs);
      setRouteFilter(listFilter.routes);
      setQuestionFilter(listFilter.quesions);
    }
  };

  const filterList = async() => {
    return await filterListData(missionId);
  }

  const downloadFile = async() => {
    if (missionId === 0) {
      return;
    }
    return await getReportPhotos(
      'Fotos_' + new Date(),
      missionId,
      userListFilter,
      pdvListFilter,
      routeListFilter,
      questionListFilter
    );
  };

  return (
    <>
      <Grid className='grid'>
        {
          openMenu &&
          <Grid item xs={4} className='gridMenu'>
          <ListFilter
            title='Proyectos'
            list={list}
            handleOpenMenu={handleOpenMenu}
            handleItemClick={handleReportClick}
            loading={loadingListFilter}
          />
          <Divider></Divider>
          {
            !loadingListFilter &&
            <Button
              className='button'
            >
              TEXTO BOTÓN
            </Button>
          }
        </Grid>
        }
        <Grid className={openMenu ? 'gridTableMenuOpen' : 'gridTable'}>
          <GenericTablePhotos
            tableTitle='Fotos'
            handleOpenMenu={handleOpenMenu}
            filters={filters}
            openMenu={openMenu}
            data={data}
            showAddButton={false}
            showArrowButton={true}
            loading={loading}
            downloadFile={downloadFile}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default (GridPhotosPage);