import React from 'react';
import MarketauditRouter from './MarketauditRouter';
import theme from 'theme/theme';
import { ThemeProvider } from '@material-ui/core/styles'

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MarketauditRouter/>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
