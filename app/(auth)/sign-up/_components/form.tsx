"use client";

import * as z from "zod";
import axios from "axios";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z.string().trim().email({ message: "이메일을 입력하세요." }),
  name: z.string().min(1, { message: "이름을 입력하세요." }),
  password: z.string().trim().min(1, { message: "비밀번호를 입력하세요." }),
});

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("values", values);
  };

  return (
    <Form {...form}>
      <div className="min-h-[400px] w-[400px] space-y-4 rounded-md bg-white p-4">
        <h1 className="text-center text-2xl font-bold">회원가입</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일을 입력하세요."
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이름을 입력하세요."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비밀번호를 입력하세요."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="my-8 w-full">회원가입</Button>
        </form>
      </div>
    </Form>
  );
};
