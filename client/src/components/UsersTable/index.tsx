import React, { useEffect, useState, useCallback } from 'react';
import UsersTableHeader from './UsersTableHeader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllUsersRequest } from '../../payloadCreators/adminUsersPayload';
import { Table, TableContainer, makeStyles, Paper, Box } from '@material-ui/core';
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
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, []);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent, property: any) => {
      const isAsc = orderBy === property && order === ORDER.ASC;
      setOrder(isAsc ? ORDER.DESC : ORDER.ASC);
      setOrderBy(property);
    },
    [order, orderBy],
  );

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
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
      </Paper>
    </Box>
  );
}
export default UsersTable;
