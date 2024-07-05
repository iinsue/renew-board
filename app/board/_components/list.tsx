"use client";

import axios from "axios";
import { useEffect } from "react";

export const PostListComponent = () => {
  useEffect(() => {
    axios.get("/api/post").then((res) => {
      console.log("res", res);
    });
  }, []);

  return (
    <>
      <div>PostListComponent</div>
    </>
  );
};
