//import App from './App/index';

//export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './App/reducers';
import Main from './App/screens/Main';
import HomePage from './App/screens/HomePage';
import Project from './App/screens/Project';

let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
const middleware = [ ReduxThunk];
middleware.push(logger);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
              <IndexRoute component={HomePage}/>
                <Route path="/project" component={Project}/>
          </Route>
        </Router>
        </div>
      </Provider>
    );
  }
};

export default App;
