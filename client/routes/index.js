import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App.jsx';
import Home from '../components/Home.jsx';
import Authentication from '../components/Authentication.jsx';
import Documents from '../components/Documents.jsx';
import EditDoc from '../components/EditDoc.jsx';
import EditUser from '../components/EditUser.jsx';
import Users from '../components/Users.jsx';
import NotFound from '../components/NotFound.jsx';

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
