"use client";

import * as z from "zod";
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

import { SignUpFormSchema as FormSchema } from "@/schema";
import { signUpAction } from "@/actions/sign-up";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const response = await signUpAction(values);
      if (response.success) {
        toast.success(response.success, { id: "sign-up" });
        router.replace("/sign-in");
      } else {
        toast.error(response.error, { id: "sign-up" });
      }
    });
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
                      placeholder="비밀번호를 입력하세요."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="my-8 w-full" disabled={isPending}>
            회원가입
          </Button>
        </form>
      </div>
    </Form>
  );
};
