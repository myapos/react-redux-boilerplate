import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/store';
import App from '../components/App';

const initialState = {
  'testState':  'test'
};

const Root = () => <Provider store={configureStore(initialState)}>
  <App />
</Provider>;

export default Root;