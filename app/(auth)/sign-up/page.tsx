import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "./_components/form";

const SignUpPage = () => {
  return (
    <>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">회원가입</CardTitle>
          <CardDescription>
            회원정보를 입력하고 계정을 생성해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 회원가입 폼 */}
          <SignUpForm />
        </CardContent>
      </Card>
    </>
  );
};

export default SignUpPage;
