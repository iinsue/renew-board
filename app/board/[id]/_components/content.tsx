"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const PostContent = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((res) => {
      if (res.status === 200) setPost(res.data);
    });
  }, [id]);

  return (
    <>
      <div>{post?.content}</div>
    </>
  );
};
