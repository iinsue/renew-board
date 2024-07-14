import * as z from "zod";

export const SignInFormSchema = z.object({
  email: z.string().trim().email({
    message: "이메일 형식이 아닙니다.",
  }),
  password: z.string().trim().min(1, {
    message: "비밀번호를 입력하세요.",
  }),
});

export const SignUpFormSchema = z.object({
  email: z.string().trim().email({ message: "이메일 형식이 아닙니다." }),
  name: z.string().trim().min(1, { message: "이름을 입력하세요." }),
  password: z.string().trim().min(1, { message: "비밀번호를 입력하세요." }),
});

export type PostType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
