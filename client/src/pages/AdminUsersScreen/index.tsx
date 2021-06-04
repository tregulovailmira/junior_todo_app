import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import UsersTable from '../../components/UsersTable';
import { styled } from '@material-ui/core/styles';

const ScreenContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  margin: '15px auto',
  maxWidth: '800px',
});

function AdminUsersScreen() {
  return (
    <ScreenContainer>
      <Link to="/users/create" style={{ textDecoration: 'none' }}>
        <Button color="primary" variant="contained">
          Create user
        </Button>
      </Link>

      <UsersTable />
    </ScreenContainer>
  );
}

export default AdminUsersScreen;
