import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { File } from '../../store/common/types';

// Improve by using Generics <T> for both User and File table
interface FileTableProps {
    files: File[];
}

const FileTable = ({ files } : FileTableProps) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<File>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'filePath',
        header: 'Preview',
        Cell: ({ cell }) => <img src={cell.getValue<string>()} />,
      }
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={files} />;
};

export default FileTable;