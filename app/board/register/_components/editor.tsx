"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { EditorState } from "lexical";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LexicalEditor } from "@/components/common/lexical/editor";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { PostFormSchema as FormSchema } from "@/schema";

export const TextEditor = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { title, content } = values;
    const response = await axios.post("/api/post", {
      title,
      content,
    });
    if (response.status === 200) {
      toast.success("게시글이 등록되었습니다.", { id: "board" });
      router.replace("/board");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormControl>
                  <Input
                    placeholder="제목을 입력하세요."
                    type="text"
                    disabled={false}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LexicalEditor
                    className="h-[500px]"
                    onChange={(editorState: EditorState) => {
                      field.onChange(JSON.stringify(editorState.toJSON()));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">등록</Button>
        </form>
      </Form>
    </>
  );
};
