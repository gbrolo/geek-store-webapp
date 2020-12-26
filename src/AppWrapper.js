import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

// Create redux store
const initialState = {};
const store = configureStore(initialState);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);