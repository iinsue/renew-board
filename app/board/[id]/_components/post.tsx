"use client";

import { LexicalViewer } from "@/components/common/lexical/viewer";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  postId: string;
};

export const PostContent = ({ postId }: Props) => {
  const [postContent, setPostContent] = useState<InitialEditorStateType>();

  const getPost = useCallback(async () => {
    const response = await axios.get(`/api/post/${postId}`);
    if (response.status === 200) {
      setPostContent(response.data.content);
    }
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      {postContent ? (
        <LexicalViewer content={postContent} />
      ) : (
        <div className="flex min-h-[450px] w-full items-center justify-center bg-white">
          <Loader2 className="size-10 animate-spin text-slate-400" />
        </div>
      )}
    </>
  );
};
