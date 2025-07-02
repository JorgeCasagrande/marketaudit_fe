const useFilterHook = (allData, setShowData, checkBoxList, setCheckBoxList, setCheckedAll, page, rowsPerPage, tableData, containsCheck) => {
  const handleFilterHook = (filterText) => {
    resetCheckList();
    let options = [...allData];
    
    if (filterText) {

      const allowed = Object.keys(options[0]);

      const result = options.filter(o => filterArray(o, allowed, filterText) === true);
      setShowData(result);
    } else if (filterText === '') {
      setShowData(options);
    }
  };

  const filterArray = (item, fields, filterValue) => {
    let result = false;
    fields.forEach(element => {
      if (item[element.toString()].toString().toLowerCase().includes(filterValue.toString().toLowerCase()) && !result){
        result = true;
      }
    });
    return result;
  } 

  const handleSelectAllRow = (checkValue) => {
    const arrayOfIds = [];
    const rows = [...tableData];

    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).forEach((item, key) => {
      item.check = checkValue;
      arrayOfIds.push(item.id);
    });
    setShowData(rows);
    if (checkValue) {
      setCheckBoxList(arrayOfIds);
    } else {
      setCheckBoxList([]);
    }
    setCheckedAll(checkValue);
  };

  const handleSelectRow = (id) => {
    if (containsCheck){
      debugger;
    const currentIndex = checkBoxList.indexOf(id);
    const selectedList = [...checkBoxList];
    const rows = [...tableData]
    const arrayIndex = rows.findIndex(x => x.id === id);
    const ob = {...rows[arrayIndex]};

    if (currentIndex === -1) {
      selectedList.push(id);
      ob.check = true;
    } else {
      selectedList.splice(currentIndex, 1);
      ob.check = false;
    }
    rows[arrayIndex] = ob;
    setShowData(rows);
    setCheckBoxList(selectedList);
    }
  };

  const resetCheckList = () => {
    if (checkBoxList) {
      const rows = [...tableData];

      rows.forEach((item, key) => {
        item.check = false;
      });
      setCheckedAll(false);
      setShowData(rows);
      setCheckBoxList([]);
    }
    
  };

  return {
    handleFilterHook,
    handleSelectAllRow,
    handleSelectRow,
    resetCheckList,
  };
}

export default useFilterHook;