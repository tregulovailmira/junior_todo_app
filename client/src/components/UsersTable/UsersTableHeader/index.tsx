import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { ORDER, ORDER_BY } from '../index';

const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
];

interface HeaderProps {
  orderBy: ORDER_BY;
  order: ORDER;
  classes: any;
  onRequestSort: (event: React.MouseEvent, property: any) => void;
}
function UsersTableHeader(props: HeaderProps) {
  const { orderBy, order, onRequestSort } = props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell />
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            align={headCell.numeric ? 'right' : 'left'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : ORDER.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default UsersTableHeader;
