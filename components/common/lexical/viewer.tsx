"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

type Props = {
  content?: InitialEditorStateType;
  className?: string;
};

export const LexicalViewer = ({ content, className }: Props) => {
  // 뷰어 기본설정
  const initialConfig: InitialConfigType = {
    namespace: "LexicalViewer",
    editable: false,
    onError: () => {},
    editorState: content,
  };

  return (
    <ScrollArea
      className={cn(
        "h-full overflow-auto rounded-sm border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-full min-h-[450px] resize-none text-ellipsis px-2 py-[15px] outline-none" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </ScrollArea>
  );
};
