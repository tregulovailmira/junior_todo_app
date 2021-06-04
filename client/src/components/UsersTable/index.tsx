import React, { useEffect, useState, useCallback } from 'react';
import UsersTableHeader from './UsersTableHeader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllUsersRequest } from '../../payloadCreators/adminUsersPayload';
import { Table, TableContainer, makeStyles } from '@material-ui/core';
import UsersTableBody from './UsersTableBody';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export enum ORDER_BY {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
}

export enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

function UsersTable() {
  const [orderBy, setOrderBy] = useState<ORDER_BY>(ORDER_BY.ID);
  const [order, setOrder] = useState<ORDER>(ORDER.ASC);
  const [limit, setLimit] = useState(5);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const classes = useStyles();

  useEffect(() => {
    const filters = {
      order: {
        name: ORDER_BY.ID,
        id: ORDER.ASC.toUpperCase(),
      },
      take: limit,
      skip: 0,
    };
    dispatch(getAllUsersRequest(JSON.stringify(filters)));
  }, []);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent, property: ORDER_BY) => {
      const isAsc = orderBy === property && order === ORDER.ASC;
      setOrder(isAsc ? ORDER.DESC : ORDER.ASC);
      setOrderBy(property);
      const filters = {
        order: {
          name: property,
          id: isAsc ? ORDER.DESC.toUpperCase() : ORDER.ASC.toUpperCase(),
        },
        take: limit,
        skip: 0,
      };
      console.log(filters);
      dispatch(getAllUsersRequest(JSON.stringify(filters)));
    },
    [order, orderBy],
  );

  return (
    <>
      <TableContainer>
        <Table>
          <UsersTableHeader
            orderBy={orderBy}
            order={order}
            classes={classes}
            onRequestSort={handleRequestSort}
          />
          <UsersTableBody users={users} />
        </Table>
      </TableContainer>
    </>
  );
}
export default UsersTable;
