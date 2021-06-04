import React, { useCallback, useState } from 'react';
import { Button, MenuItem, Select } from '@material-ui/core';
import { DbFilters, User } from '../../interfaces';
import { nanoid } from 'nanoid';
import { getAllUsersRequest } from '../../payloadCreators/adminUsersPayload';
import { useAppDispatch } from '../../app/hooks';
import { ORDER_BY, ORDER_FOR_DB } from '../UsersTable';

interface PaginationProps {
  users: User[];
  onLimitChange: (newLimit: number) => void;
  itemsPerPage: number[];
  limit: number;
  createFilters: (orderBy: ORDER_BY, order: ORDER_FOR_DB, take: number, skip: number) => DbFilters;
}

function Pagination(props: PaginationProps) {
  const [page, setPage] = useState(1);
  const { onLimitChange, itemsPerPage, limit, createFilters, users } = props;
  const dispatch = useAppDispatch();

  const onChangHandle = useCallback(event => {
    onLimitChange(event.target.value);
  }, []);

  const getNextPage = useCallback(() => {
    console.log('page', page);

    const skip = page * limit;
    const filters = createFilters(ORDER_BY.ID, ORDER_FOR_DB.ASC, limit, skip);
    setPage(page + 1);
    dispatch(getAllUsersRequest(JSON.stringify(filters)));
  }, [page, limit]);

  const getPrevPage = useCallback(() => {
    const skip = (page - 2) * limit;
    const filters = createFilters(ORDER_BY.ID, ORDER_FOR_DB.ASC, limit, skip);
    setPage(page - 1);
    dispatch(getAllUsersRequest(JSON.stringify(filters)));
  }, [page, limit]);

  return (
    <>
      <Select value={limit} onChange={onChangHandle}>
        {itemsPerPage.map(item => (
          <MenuItem key={nanoid()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <Button color="primary" variant="contained" onClick={getPrevPage} disabled={page <= 1}>
        Prev
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={getNextPage}
        disabled={users.length < limit}
      >
        Next
      </Button>
    </>
  );
}

export default Pagination;
