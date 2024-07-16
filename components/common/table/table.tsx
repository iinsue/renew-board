import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Cell,
  flexRender,
  Row,
  Table as TableProps,
} from "@tanstack/react-table";
import { useCallback } from "react";

type Props<TData> = {
  table: TableProps<TData>;
  className?: string;
  onRowClick?: (row: Row<TData>) => void;
};

export function DataTable<TData>({
  table,
  className,
  onRowClick,
}: Props<TData>) {
  // 빈 테이블 체크
  const isTableEmpty = table.getRowModel().rows.length === 0;

  const onClick = useCallback(
    (
      event: React.MouseEvent<HTMLTableCellElement>,
      cell: Cell<TData, unknown>,
    ) => {
      if (isTableEmpty) return;

      event.preventDefault();
      event.stopPropagation();

      if (onRowClick) onRowClick(cell?.row);
    },
    [onRowClick, isTableEmpty],
  );

  if (isTableEmpty) return <div>Empty...</div>;

  return (
    <Table className="rounded-md bg-white lg:w-[1000px]">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const size = header.column.getSize();
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn("p-2", `w-[${size}px]`)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const size = cell.column.getSize();
                return (
                  <TableCell
                    key={cell.id}
                    className={cn("p-2", `w-[${size}px]`)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
