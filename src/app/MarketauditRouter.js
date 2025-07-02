import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from './Routes';
import LoginPage from 'components/auth/LoginPage';
import PrivateRoute from './PrivaterRoute';
import MainPage from 'components/mainPage/MainPage';
import CustomProgress from 'components/common/customProgress/CustomProgress';

const MarketauditRouter = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<CustomProgress loading={true}/>} >
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to={routes.marketaudit}/>}/>
            <PrivateRoute path={routes.marketaudit} render={() => <MainPage/>}/>
            <Route exact path={routes.login} render={() => <LoginPage/>}/>
            <PrivateRoute render={() => <MainPage/>}/>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default MarketauditRouter;