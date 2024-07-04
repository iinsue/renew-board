"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

const onError = (error: Error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "text-editor",
  theme,
  onError,
};

export const TextEditor = () => {
  return (
    <>
      <div className="relative rounded-md bg-white">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[450px] w-[400px] resize-none overflow-hidden text-ellipsis p-4 outline-none" />
            }
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={
              <div className="pointer-events-none absolute left-4 top-4 select-none">
                Enter some text...
              </div>
            }
          />
        </LexicalComposer>
      </div>
    </>
  );
};
