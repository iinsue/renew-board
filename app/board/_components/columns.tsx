import { format } from "date-fns";
import { PostType } from "@/schema";
import { ko } from "date-fns/locale";
import { TableRowActions } from "./row-actions";
import { ColumnDef } from "@tanstack/react-table";

export const postColumns: ColumnDef<PostType>[] = [
  {
    accessorKey: "title",
    header: () => <div>제목</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
    size: 600,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="flex justify-center">작성일</div>,
    cell: ({ row }) => {
      const date = format(row.getValue("createdAt"), "yyyy-MM-dd", {
        locale: ko,
      });

      return <div className="flex justify-center">{date}</div>;
    },
    size: 100,
  },
  {
    id: "action",
    header: () => <div className="flex justify-center">상세페이지</div>,
    cell: ({ row }) => <TableRowActions row={row} />,
    size: 100,
  },
];
