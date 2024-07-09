import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "./_components/form";

const SignInPage = () => {
  return (
    <>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 회원가입 폼 */}
          <SignInForm />
        </CardContent>
      </Card>
    </>
  );
};

export default SignInPage;
