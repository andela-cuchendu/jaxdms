import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import Authentications from '../components/Authentication';
import Document from '../components/Documents';
import EditDocs from '../components/EditDoc';
import EditUsers from '../components/EditUser';
import User from '../components/Users';
import NotFound from '../components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/auth" component={Authentications} />
    <Route path="/docs" component={Document} />
    <Route path="/public" component={Document} />
    <Route path="/role" component={Document} />
    <Route path="/users" component={User} />
    <Route path="docs/edit/:id" component={EditDocs} />
    <Route path="users/edit/:id" component={EditUsers} />
    <Route path="*" component={NotFound} />
  </Route>
);
