"use client";

import { signOutAction } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export const LogoutButton = () => {
  // 로그아웃 클릭 시 로딩처리
  const [isPending, startTransition] = useTransition();

  // 로그아웃 클릭
  const onClick = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <>
      <Button onClick={onClick} disabled={isPending}>
        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        로그아웃
      </Button>
    </>
  );
};
