import React from 'react';
import {  Route, IndexRoute } from 'react-router';

import HomePage from '../screens/HomePage';
import Project from '../screens/Project';
//import App from '../index';

const routes = (
    <Route path="/" component={HomePage}>
      <IndexRoute component={HomePage}/>
      <Route path="/project" component={Project}/>
    </Route>
);

export default routes;
