import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';

function App () {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/todos" component={UserDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
