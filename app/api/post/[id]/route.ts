import { userSession } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = params;
    const user = await userSession();
    if (!user) {
      return new NextResponse("로그인 후 이용해주세요", { status: 401 });
    }
    // 게시글 상세 조회
    const post = await db.post.findUnique({
      where: { id },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("[게시글 상세 조회 오류]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = params;
    await db.post.delete({ where: { id } });
    return NextResponse.json(
      { message: "게시글이 삭제되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.log("[게시글 상세 조회 오류]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
