import { userSession } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await userSession();
    if (!user) {
      return new NextResponse("로그인 후 이용해주세요", { status: 401 });
    }

    const body = await req.json();

    await db.post.create({
      data: {
        title:body.title,
        content: body.content,
        authorId: user.id!,
      },
    });

    return NextResponse.json({ message: "게시글 작성 성공" }, { status: 200 });
  } catch (error) {
    console.log("[게시글 작성 오류]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await userSession();
    if (!user) {
      return new NextResponse("로그인 후 이용해주세요", { status: 401 });
    }

    // 게시글 조회
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("[게시글 조회 오류]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
