import React, {useState, useEffect} from 'react';
import { withStyles, Button, Paper, Grid, Hidden,
  CircularProgress, Box, Typography, InputAdornment, IconButton} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MkTextField from 'components/common/textField/MkTextField';
import loginImage from 'assets/img/LoginImage.png';
import marketLogo from 'assets/img/marketLogo.png';
import {login} from './Request';
import {routes} from 'app/Routes';
import {isUserStored, storeUser} from 'helpers/AuthenticationHelper';
import {Visibility, VisibilityOff } from '@material-ui/icons';

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    backgroundImage: `url(${loginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '100%',
  },
  imageSection: {
    backgroundColor: '#212121',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MkImage: {
    height: '68px',
    width: '268px',
    marginBottom: '34px'
  },
  textField: {
    marginBottom: '32px',
    marginTop: '8px',
    width: '38%'
  },
  loginButton: {
    width: '38%',
    backgroundColor: '#e65100',
    color: '#ffffff',
    float: 'center',
    marginBottom: '24px'
  },
  buttonContainer: {
    width: '38%'
  },
  remindmeButton: {
    float: 'left'
  },
  recoverPasswordButton: {
    float: 'right'
  },
  errorMessage: {
    marginBottom: '10px',
    color: '#003a60',
    textAlign: 'center'
  }
});

const AUTHENTICATION_FAILED_MESSAGE =
<ul>
<Typography>INICIO DE SESION FALLIDO</Typography>
<Typography>Usuario y/o contraseña son invalidos.</Typography>
</ul>

const LoginPage = (props) => {
  const {classes} = props;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hiddedPassword, setHiddedPassword] = useState(true);

  useEffect(() => {
    if (isUserStored()) {
      props.history.push(routes.home);
    }
  }, []);

  const handleLogin = async() => {
    setLoading(true);
    const data = { User: userName, Password: password };
    await login(data).then(response => {
      if (response.status === 200) {
        if (response.data.status === "Ok") {
          storeUser(response.data.data.userId, response.data.data.userName);
          props.history.push(routes.home);
        } else if (response.data.status === "Error") {
          setErrorMessage(AUTHENTICATION_FAILED_MESSAGE);
        }
        setLoading(false);
      }
    }).catch(() => {
      setErrorMessage(AUTHENTICATION_FAILED_MESSAGE);
      setLoading(false);
    });
  };

  return (
    <Grid className={classes.root}>
      <Hidden smDown>
        <Grid className={classes.imageSection} xs={false} sm={false} md={5} lg={5} item>
          <div className={classes.image}/>
        </Grid>
      </Hidden>
      <Grid xs={5} sm={8} md={5} lg={7} item>
        <Paper className={classes.paper}>
            <img alt='' src={marketLogo} className={classes.MkImage}/>
          <MkTextField
            label='Introducir correo'
            type='email'
            className={classes.textField}
            value={userName || ''}
            onChange={(e) => {setUserName(e.target.value)}}
          />
          <MkTextField
            label='Introducir contraseña'
            className={classes.textField}
            type={hiddedPassword ? 'password' : 'text'}
            value={password || ''}
            onChange={(e) => {setPassword(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {setHiddedPassword(!hiddedPassword)}}
                >
                  {hiddedPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            className={classes.loginButton}
            disabled={ userName.trim() === '' || password.trim() === '' || userName.trim().length < 4 || password.trim().length < 4 ||  loading }
            onClick={handleLogin}
          >
            {loading ? <CircularProgress size={24}/> : 'INICIAR SESION' }
          </Button>
          
          <Box
            className={classes.errorMessage}
          >
            {
              errorMessage !== '' && errorMessage
            }
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(withStyles(styles)(LoginPage));