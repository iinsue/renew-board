"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import db from "@/lib/db";
import { SignUpFormSchema as FormSchema } from "@/schema";

export const signUpAction = async (values: z.infer<typeof FormSchema>) => {
  const validatedValues = FormSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "형식이 올바르지 않습니다." };
  }

  const { email, password, name } = validatedValues.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return { success: "회원가입에 되었습니다." };
  } catch (error) {
    return { error: "회원가입에 실패했습니다." };
  }
};
