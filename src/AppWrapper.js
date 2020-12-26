// fonts
import './fonts.css';

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import theme from './utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Create redux store
const initialState = {};
const store = configureStore(initialState);

export default ({ element }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </MuiThemeProvider>
  </Provider>
);