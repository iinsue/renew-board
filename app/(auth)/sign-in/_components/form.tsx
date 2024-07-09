"use client";

import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
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
import { signInAction } from "@/actions/sign-in";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1),
});

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const response = await signInAction(values);
      if (response?.error) {
        toast.error(response.error, { id: "sign-in" });
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="이메일을 입력하세요."
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
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel>비밀번호</FormLabel>
                    <Button
                      className="ml-auto flex h-auto p-0 text-xs text-slate-500 underline underline-offset-4 hover:text-slate-800"
                      variant="link"
                    >
                      비밀번호를 잊으셨나요?
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Button className="mt-8 w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-5 animate-spin" />}
              로그인
            </Button>
            <Button
              type="button"
              className="w-full"
              disabled={isPending}
              variant="outline"
              onClick={() => router.push("/sign-up")}
            >
              회원가입
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
