/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Store from './store/ConfigureStore';
import routes from './routes';
import { GetRoles } from './actions/RolesActions';
import './styles/index.sass';

const store = Store();
store.dispatch(GetRoles());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'),
);
