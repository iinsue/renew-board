type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-200">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
