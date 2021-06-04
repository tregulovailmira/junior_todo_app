import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import UsersTable from '../../components/UsersTable';
function AdminUsersScreen() {
  return (
    <>
      <Link to="/users/create" style={{ textDecoration: 'none' }}>
        <Button color="primary" variant="contained">
          Create user
        </Button>
      </Link>

      <UsersTable />
    </>
  );
}

export default AdminUsersScreen;
