import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostListComponent } from "./_components/list";

const BoardPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="grid w-full space-y-4 lg:justify-center">
        <PostListComponent />

        <Button asChild>
          <Link href="/board/register">게시글 등록</Link>
        </Button>
      </div>
    </div>
  );
};

export default BoardPage;
