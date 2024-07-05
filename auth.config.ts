import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { SignInFormSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // zod 타입 체크
        const validatedFields = SignInFormSchema.safeParse(credentials);

        // 타입체크 성공 시 조건
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // email 로 등록된 사용자 정보가 있는지 조회
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          // 입력한 비밀번호가 맞는 지 검증
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
