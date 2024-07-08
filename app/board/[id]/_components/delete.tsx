"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  postId: string;
};

export const DeletePostComponent = ({ className, postId }: Props) => {
  const router = useRouter();
  const onClick = async () => {
    const response = await axios.delete(`/api/post/${postId}`);
    if (response.status === 200) {
      toast.success(response.data.message, { id: "delete-post" });
      router.replace("/board");
    } else {
      toast.error("삭제에 실패했습니다.", { id: "delete-post" });
    }
  };
  return (
    <>
      <Button className={cn(className)} onClick={onClick}>
        삭제하기
      </Button>
    </>
  );
};
