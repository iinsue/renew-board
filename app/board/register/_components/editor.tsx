"use client";

import { LexicalEditor } from "@/components/common/lexical/editor";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const TextEditor = () => {
  const router = useRouter();
  const [editorState, setEditorState] = useState<string | null>(null);
  const onChange = (editorState: EditorState) => {
    setEditorState(JSON.stringify(editorState.toJSON()));
  };
  const onClick = async () => {
    const response = await axios.post("/api/post", {
      content: editorState,
    });
    if (response.status === 200) {
      toast.success("게시글이 등록되었습니다.", { id: "board" });
      router.replace("/board");
    }
  };

  return (
    <>
      <LexicalEditor className="h-[500px]" onChange={onChange} />
      <Button onClick={onClick}>등록</Button>
    </>
  );
};
