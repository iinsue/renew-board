import { Button } from "@/components/ui/button";
import Link from "next/link";

const BoardPage = () => {
  return (
    <>
      <div>Board</div>
      <Button asChild>
        <Link href="/board/register">게시글 등록</Link>
      </Button>
    </>
  );
};

export default BoardPage;
