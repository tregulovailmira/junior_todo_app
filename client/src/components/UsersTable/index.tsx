import React, { useEffect, useState, useCallback } from 'react';
import UsersTableHeader from './UsersTableHeader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllUsersRequest } from '../../payloadCreators/adminUsersPayload';
import { Table, TableContainer, makeStyles } from '@material-ui/core';
import UsersTableBody from './UsersTableBody';
import Pagination from '../Pagination';
import { DbFilters } from '../../interfaces';

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

export enum ORDER_FOR_DB {
  ASC = 'ASC',
  DESC = 'DESC',
}

function UsersTable() {
  const [orderBy, setOrderBy] = useState<ORDER_BY>(ORDER_BY.ID);
  const [order, setOrder] = useState<ORDER>(ORDER.ASC);
  const [limit, setLimit] = useState(5);

  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const classes = useStyles();

  useEffect(() => {
    const filters = createFilters(ORDER_BY.ID, ORDER_FOR_DB.ASC, limit, 0);

    dispatch(getAllUsersRequest(JSON.stringify(filters)));
  }, []);

  useEffect(() => {
    const filters = createFilters(ORDER_BY.ID, ORDER_FOR_DB.ASC, limit, 0);
    dispatch(getAllUsersRequest(JSON.stringify(filters)));
  }, [limit]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent, property: ORDER_BY) => {
      const isAsc: boolean = orderBy === property && order === ORDER.ASC;

      setOrder(isAsc ? ORDER.DESC : ORDER.ASC);
      setOrderBy(property);

      const newOrder = isAsc ? ORDER_FOR_DB.DESC : ORDER_FOR_DB.ASC;
      const filters = createFilters(property, newOrder, limit, 0);

      dispatch(getAllUsersRequest(JSON.stringify(filters)));
    },
    [order, orderBy, limit],
  );

  const onLimitChange = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
    },
    [limit],
  );

  const createFilters = useCallback(
    (orderBy: ORDER_BY, order: ORDER_FOR_DB, take: number, skip: number) => {
      const filters: DbFilters = {
        order: {
          [orderBy]: order,
        },
        take,
        skip,
      };
      return filters;
    },
    [limit],
  );

  return (
    <>
      <Pagination
        limit={limit}
        users={users}
        onLimitChange={onLimitChange}
        itemsPerPage={[5, 10, 15]}
        createFilters={createFilters}
      />
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
