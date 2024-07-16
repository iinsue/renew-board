"use client";

import { Button } from "@/components/ui/button";
import { PostType } from "@/schema";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

type Props = {
  row: Row<PostType>;
};

export function TableRowActions({ row }: Props) {
  const router = useRouter();
  const onClick = () => {
    const { id } = row.original;
    router.push(`/board/${id}`);
  };

  return (
    <>
      <Button
        onClick={onClick}
        className="h-full w-[100px] p-1"
        variant="outline"
      >
        상세
      </Button>
    </>
  );
}
