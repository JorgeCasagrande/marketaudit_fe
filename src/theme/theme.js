import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Open Sans", "-apple-system", "BlinkMacSystemFont",
     "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
      "Droid Sans", "Helvetica Neue", "sans-serif"`,
  },
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.6)',
      light: 'rgba(0, 0, 0, 0.6)',
      dark: 'rgba(0, 0, 0, 0.6)'
    },
    secondary: {
      main: '#fb8c00'
    },
    text: {
      primary:'rgba(0, 0, 0, 0.6)'
    }
  }
});

export default theme;