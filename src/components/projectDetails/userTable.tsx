import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { User } from '../../store/common/types';

// Improve by using Generics <T> for both User and File table
interface UserTableProps {
    users: User[];
  }

const UserTable = ({ users } : UserTableProps) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      }
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={users} />;
};

export default UserTable;