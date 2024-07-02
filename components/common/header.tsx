import { ExtendedUser } from "@/next-auth";

type Props = {
  user?: ExtendedUser;
};

export const MainHeader = ({ user }: Props) => {
  return (
    <>
      <div className="flex h-[48px] items-center justify-between bg-indigo-800 px-4">
        <div>{user?.name}</div>
      </div>
    </>
  );
};
