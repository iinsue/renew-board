import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainPage = () => {
  return (
    <>
      <div>Main Page</div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button>로그아웃</Button>
      </form>
      <Button asChild className="mt-2">
        <Link href="/board">게시판</Link>
      </Button>
    </>
  );
};

export default MainPage;
