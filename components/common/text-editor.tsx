"use client";
import { EditorState } from "lexical";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

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

const loadContent = async () => {
  //'empty' editor
  const initialValue =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  return initialValue;
};

type Props = {
  className?: String;
  onChange: (editorState: EditorState) => void;
};

export const LexicalEditor = ({ className, onChange }: Props) => {
  const initialConfig = {
    namespace: "text-editor",
    theme,
    onError,
    editorState: async () => await loadContent(),
  };

  return (
    <ScrollArea
      className={cn(
        "relative h-full overflow-auto rounded-sm border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-full min-h-[450px] resize-none text-ellipsis px-2 py-[15px] outline-none" />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={
            <div className="pointer-events-none absolute left-3 top-3 select-none text-muted-foreground">
              Enter some text...
            </div>
          }
        />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </ScrollArea>
  );
};
