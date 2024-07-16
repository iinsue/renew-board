import { format } from "date-fns";
import { PostType } from "@/schema";
import { ko } from "date-fns/locale";
import { TableRowActions } from "./row-actions";
import { ColumnDef } from "@tanstack/react-table";

export const postColumns: ColumnDef<PostType>[] = [
  {
    accessorKey: "title",
    header: () => <div>제목</div>,
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="flex justify-end">작성일</div>,
    cell: ({ row }) => {
      const date = format(row.getValue("createdAt"), "yyyy-MM-dd", {
        locale: ko,
      });

      return <div className="flex justify-end">{date}</div>;
    },
    size: 80,
  },
  {
    id: "action",
    header: () => <div className="flex justify-center">상세페이지</div>,
    cell: ({ row }) => <TableRowActions row={row} />,
    size: 80,
  },
];
