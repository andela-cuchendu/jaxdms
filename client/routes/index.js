import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import Authentication from '../components/Authentication';
import Documents from '../components/Documents';
import EditDoc from '../components/EditDoc';
import EditUser from '../components/EditUser';
import Users from '../components/Users';
import NotFound from '../components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/auth" component={Authentication} />
    <Route path="/docs" component={Documents} />
    <Route path="/shar" component={Documents} />
    <Route path="/role" component={Documents} />
    <Route path="/user" component={Users} />
    <Route path="docs/edit/:id" component={EditDoc} />
    <Route path="users/edit/:id" component={EditUser} />
    <Route path="*" component={NotFound} />
  </Route>
);
