import React, {useState} from 'react';
import Toolbar from 'components/common/toolBar/Toolbar';
import SideBar from 'components/common/sideBar/SideBar';
import AppBody from 'app/AppBody';
import Breadcrumbs from 'components/common/breadcrumbs/BreadcrumbsRouter';

const MainPage = () => {
  const [openSidebar, setopenSideBar] = useState(false);

  const handleDrawerToggle = () => {
    setopenSideBar(!openSidebar);
  };

  return (
    <React.Fragment>
      <Toolbar
        handleDrawerToggle={handleDrawerToggle}
      />
      <Breadcrumbs/>
      <AppBody/>
      <SideBar
        openSidebar={openSidebar}
        handleDrawerToggle={handleDrawerToggle}
      />
    </React.Fragment>
  );
};

export default MainPage;