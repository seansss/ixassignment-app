import { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import { Button } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { API_BASE_URL } from '../../appSettings';
import { useNavigate } from 'react-router'
import { Project } from '../../store/common/types';

type ProjectApiResponse = {
  results: { 
    records: Array<Project>;
    totalRecords: number;
  }
};

const ProjectMaterialTable = () => {
  const navigate = useNavigate()

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  // const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isError, isFetching, isLoading, refetch } =
    useQuery<ProjectApiResponse>({
      refetchOnWindowFocus: false,
      queryKey: [
        'table-data',
        columnFilters, //refetch when columnFilters changes
        // globalFilter, //refetch when globalFilter changes
        pagination.pageIndex, //refetch when pagination.pageIndex changes
        pagination.pageSize, //refetch when pagination.pageSize changes
        sorting, //refetch when sorting changes
      ],
      queryFn: async () => {

        const fetchURL = new URL(
          '/Project/Projects',
          API_BASE_URL
        );
        fetchURL.searchParams.set(
          'start', `${pagination.pageIndex}`,
        );
        fetchURL.searchParams.set('size', `${pagination.pageSize}`);
        fetchURL.searchParams.set(
          'filters',
          JSON.stringify(columnFilters ?? []),
        );
        fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        const response = await fetch(fetchURL.href);
        const json = (await response.json()) as ProjectApiResponse;
        return json;
      },
      keepPreviousData: true,
    });

  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        enableColumnFilter: false
      }
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data?.results.records ?? []}
      enableGlobalFilter={false} 
      initialState={{ showColumnFilters: true, columnVisibility: { id : false } }}
      manualFiltering
      manualPagination
      manualSorting
      muiToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined
      }
      muiTablePaginationProps= {{
        rowsPerPageOptions: [5, 10, 20]
      }}
      onColumnFiltersChange={setColumnFilters}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      rowCount={data?.results?.totalRecords ?? 0}
      enableRowActions={true}
      renderRowActions={({ row }) => [
        <Button type='button' variant='outlined' size='small'
                  onClick={() => {
                    navigate(`/project/${row.original.id}`)

                  }}
                >Details</Button>
      ]}
      state={{
        columnFilters,
        // globalFilter,
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
    />
  );
};

const queryClient = new QueryClient();

const ProjectTableWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectMaterialTable />
  </QueryClientProvider>
);

export default ProjectTableWithReactQueryProvider;
