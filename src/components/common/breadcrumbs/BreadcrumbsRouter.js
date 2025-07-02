import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import BreadcrumbsRouterStyle from 'theme/styles/components/BreadcrumbsRouterStyle';

const LinkRouter = props => <Link {...props} to={props.to} component={RouterLink} />;

const BreadcrumbsRouter = (props) => {
  const {classes} = props;
  return (
    <React.Fragment>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split('/').filter(x => x);
          return (
            <Breadcrumbs separator="›" className={classes.breadcrumbs}>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                  <Typography className={classes.text} key={to}>
                    {value}
                  </Typography>
                ) : (
                  <LinkRouter className={classes.text} to={to} key={to}>
                    {value}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </React.Fragment>
  );
}

export default withStyles(BreadcrumbsRouterStyle)(BreadcrumbsRouter);