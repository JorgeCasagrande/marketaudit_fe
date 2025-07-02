import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { menuRoutes } from './Routes';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBodyStyle from 'theme/styles/components/AppBodyStyle';

const AppBody = (props) => {
  const {classes} = props;
  return (
    <div className={classes.body}>
      <Switch>
        {
          menuRoutes.map(route => {
            return route.items.map((item, key) => (
              <Route
                key={`route-${key}`}
                path={item.path}
                render={ () => <item.component/> }
              />
            ));
          })
        }
      </Switch>
    </div>
  );
};

export default withStyles(AppBodyStyle)(AppBody);