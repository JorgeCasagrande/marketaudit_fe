import React from 'react';
import {
  CssBaseline,
  Paper,
  Grid,
  Typography,
  Box,
  Link,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import errorImage from 'assets/img/brokenRobot.png';

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="mailto:MarketAudit@gmail.com">
        MarketAudit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${errorImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ErrorPage = props => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Something went wrong...
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {props.error}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {props.stackTrace}
          </Typography>
          <Button
            color="danger"
            onClick={e => {window.location.reload();}}
          >
            Re-load page
          </Button>
          <Box mt={5}>
            <Footer />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
