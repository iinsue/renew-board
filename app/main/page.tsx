import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

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
    </>
  );
};

export default MainPage;
