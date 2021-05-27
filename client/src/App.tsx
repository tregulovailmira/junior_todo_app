import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';

function App () {
  return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path='/auth/login' component={Login}/>
        </Switch>
      </Router>
  );
}

export default App;
