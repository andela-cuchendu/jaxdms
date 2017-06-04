import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/Home';
import Authentication from '../components/Authentication';
import Documents from '../components/Documents';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/auth" component={Authentication} />
    <Route path="/docs" component={Documents} />
  </Route>
);