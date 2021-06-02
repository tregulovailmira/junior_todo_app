import React, { useEffect } from 'react';
import UsersItem from './UsersItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllUsersRequest } from '../../payloadCreators/adminUsersPayload';

function UsersList() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, []);

  const renderUsers = () => {
    return users.map(user => <UsersItem user={user} key={user.id} />);
  };

  return <>{renderUsers()}</>;
}
export default UsersList;
