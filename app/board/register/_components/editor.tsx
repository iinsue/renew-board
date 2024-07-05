"use client";

import { LexicalEditor } from "@/components/common/text-editor";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { useState } from "react";
import axios from "axios";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState<string | null>(null);
  const onChange = (editorState: EditorState) => {
    setEditorState(JSON.stringify(editorState.toJSON()));
  };
  const onClick = async () => {
    const response = await axios.post("/api/post", {
      content: editorState,
    });
    console.log("response", response);
  };

  return (
    <>
      <LexicalEditor className="h-[500px]" onChange={onChange} />
      <Button onClick={onClick}>등록</Button>
    </>
  );
};
