import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostListComponent } from "./_components/list";

const BoardPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="grid w-full space-y-4 lg:justify-center">
        <h1 className="mb-4 border-b border-slate-400 pb-4 text-center text-4xl font-bold">
          게시판
        </h1>
        <div className="flex justify-between">
          <div className="flex items-center justify-center bg-yellow-200">
            Search
          </div>

          <Button asChild>
            <Link href="/board/register">게시글 등록</Link>
          </Button>
        </div>
        <div>
          <PostListComponent />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
