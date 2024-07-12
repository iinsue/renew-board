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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 비밀번호 눈 아이콘
  const [isVisible, setIsVisible] = useState(false);

  // 로딩처리
  const [isLoading, startTransition] = useTransition();
  const [isRoutePending, startRouteTransition] = useTransition();

  // 로그인 혹은 회원가입 클릭 시 폼 및 버튼 비활성화 용도
  const isPending = isLoading || isRoutePending;

  // 로그인 클릭 시
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const response = await signInAction(values);
      if (response?.error) {
        toast.error(response.error, { id: "sign-in" });
      }
    });
  };

  // 회원가입 클릭 시
  const onSignUpClick = () => {
    startRouteTransition(() => router.push("/sign-up"));
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
                  <FormLabel className="text-slate-700">이메일</FormLabel>
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
                    <FormLabel className="text-slate-700">비밀번호</FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      disabled={isPending}
                      className="ml-auto flex h-auto p-0 text-xs text-slate-500 underline underline-offset-4 hover:text-slate-800"
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
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              로그인
            </Button>
            <Button
              type="button"
              className="w-full"
              disabled={isPending}
              variant="outline"
              onClick={onSignUpClick}
            >
              회원가입
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
