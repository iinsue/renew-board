import { LogoutButton } from "@/components/common/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainPage = () => {
  return (
    <>
      <div>Main Page</div>
      <Button asChild className="mt-2">
        <Link href="/board">게시판</Link>
      </Button>
      <LogoutButton />
    </>
  );
};

export default MainPage;
