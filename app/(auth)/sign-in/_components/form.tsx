"use client";

import * as z from "zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { signin } from "@/actions/signin";

const FormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1),
});

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(() => {
      signin(values).then((res) => {
        console.log("error", res?.error);
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-bold">로그인</h1>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      disabled={isPending}
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
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-8 w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-5 animate-spin" />}
            로그인
          </Button>
        </form>
      </Form>
      <Button
        asChild
        className="mt-2 w-full"
        disabled={isPending}
        variant="outline"
      >
        <Link href="/sign-up">회원가입</Link>
      </Button>
    </>
  );
};
