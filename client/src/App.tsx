import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import CreateTodo from './pages/CreateTodo';
import AdminUsersScreen from './pages/AdminUsersScreen';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/todos/create" component={CreateTodo} />

        <Route path="/todos" component={UserDashboard} />
        <Route path="/admin/users" component={AdminUsersScreen} />
      </Switch>
    </Router>
  );
}

export default App;
