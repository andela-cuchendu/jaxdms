import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from '../components/Main.jsx';
import HomePage from '../components/home/HomePage';
import NotFoundPage from '../components/PageNotFound.jsx';

export default(
  <Route path='/' component={Home}>
    <IndexRoute component={HomePage}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
