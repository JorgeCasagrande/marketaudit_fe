import './LogAppPage.scss';
import React from 'react';
import MkDatePicker from 'components/common/datePicker/MkDatePicker';
import { GetLog } from './DataMapper';
import { IconButton} from '@material-ui/core';
import { Search } from "@material-ui/icons";

const useLogApp = () => {

  const [data, setData] = React.useState({columns: [], data: []});
  const [loading, setLoading] = React.useState(false);

  const [fromDate, setFromDate] = React.useState(new Date());

  React.useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const filters = () => (
    <div className='filterSection'>
      <MkDatePicker
            label='Fecha'
            name='startDate'
            className='datepicker_1 datepicker-first'
            value={fromDate}
            onChange={date => updateChangeDate(date, 'startDate')}
          />
          <IconButton
          edge='start'
          onClick={() => {setLoading(true);loadData();}}
        ><Search/></IconButton>
    </div>
  );

  const updateChangeDate = (date, name) => {

    if (name === 'startDate') {
      setFromDate(date)
    }
  }

  const loadData = async() => {
    let result = await GetLog(fromDate);
    if (result) {
      setData(result);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    filters,
  }

}

export default useLogApp;
