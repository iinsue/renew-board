"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  // 입력 폼 에러 확인
  const { errors } = useFormState({ control: form.control });

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full gap-5">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="이메일을 입력하세요."
                    className={cn(errors[field.name] && `ring-1 ring-rose-300`)}
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
              <FormItem className="grid">
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="이름을 입력하세요."
                    type="text"
                    className={cn(errors[field.name] && `ring-1 ring-rose-300`)}
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
              <FormItem className="grid">
                <FormLabel>비밀번호</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="비밀번호를 입력하세요."
                      type={isVisible ? "text" : "password"}
                      className={cn(
                        errors[field.name] && `ring-1 ring-rose-300`,
                      )}
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
        <div className="mt-4 text-sm">
          <Button className="my-4 w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            회원가입
          </Button>
          <div className="text-center text-slate-500">
            이미 계정이 있으신가요?&nbsp;
            <Button
              disabled={isPending}
              variant="link"
              className="h-full p-1 text-slate-500 hover:text-slate-800"
              onClick={() => router.push("/sign-in")}
            >
              로그인
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
