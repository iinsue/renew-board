import { MainHeader } from "@/components/common/header";
import { userSession } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const user = await userSession();

  return (
    <div className="min-h-screen bg-slate-200">
      <MainHeader user={user} />
      {children}
    </div>
  );
};

export default MainLayout;
