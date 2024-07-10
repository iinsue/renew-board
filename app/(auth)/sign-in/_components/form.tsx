"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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

import { cn } from "@/lib/utils";
import { signInAction } from "@/actions/sign-in";
import { SignInFormSchema as FormSchema } from "@/schema";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
                      type="button"
                      className="ml-auto flex h-auto p-0 text-xs text-slate-500 underline underline-offset-4 hover:text-slate-800"
                      variant="link"
                    >
                      비밀번호를 잊으셨나요?
                    </Button>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요."
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <div
                      className={cn(
                        isPending ? "cursor-not-allowed" : "cursor-pointer",
                        "group absolute right-0 top-0 flex h-full items-center pr-3 text-slate-400",
                      )}
                      onClick={() => {
                        if (isPending) return;
                        isVisible ? setIsVisible(false) : setIsVisible(true);
                      }}
                    >
                      {isVisible ? (
                        <EyeOff
                          className={cn(
                            "size-5",
                            isPending === false && "group-hover:text-slate-500",
                          )}
                        />
                      ) : (
                        <Eye
                          className={cn(
                            "size-5",
                            isPending === false && "group-hover:text-slate-500",
                          )}
                        />
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Button className="mt-8 w-full" disabled={isPending} type="submit">
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
