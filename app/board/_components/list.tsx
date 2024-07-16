"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { useTable } from "@/hooks/useTable";
import { postColumns as columns } from "./columns";
import { DataTable } from "@/components/common/table/table";

export const PostListComponent = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const table = useTable({ columns, data: posts });

  const onClick = (id?: string) => {
    if (!id) return;
    router.push(`/board/${id}`);
  };

  useEffect(() => {
    axios.get("/api/post").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <DataTable table={table} />
    </>
  );
};
