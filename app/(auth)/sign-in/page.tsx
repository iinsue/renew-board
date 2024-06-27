import { SignInForm } from "./_components/form";

const SignInPage = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-200">
        <div className="min-h-[320px] w-[400px] rounded-md bg-white p-4">
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
