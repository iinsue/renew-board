import { auth } from "@/auth";

export const userSession = async () => {
  const session = await auth();
  return session?.user;
};
