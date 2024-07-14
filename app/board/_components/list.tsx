"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";

export const PostListComponent = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

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
      <div>PostListComponent</div>

      {posts.map((post: Post) => (
        <Button
          key={post.id}
          onClick={() => onClick(post.id)}
          className="overflow-hidden"
          variant="outline"
        >
          {post.title}
        </Button>
      ))}
    </>
  );
};
