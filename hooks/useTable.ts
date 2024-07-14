import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
};

export function useTable<TData>({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
}: Props<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return table;
}
