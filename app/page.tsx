import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-700 px-4 py-2 sm:px-8 sm:py-3">
      <div className="w-[300px] space-y-4 rounded-md bg-white p-4">
        <Button className="w-full" asChild>
          <Link href="/sign-up">회원가입</Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href="/sign-in">로그인</Link>
        </Button>
      </div>
    </main>
  );
}
