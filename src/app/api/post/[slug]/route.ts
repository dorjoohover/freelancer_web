import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { verifyUser } from "../../auth/verifyUser";
import Post from "@/models/post.model";
import User from "@/models/user.model";

export async function GET(req: NextRequest, params: { slug: string }) {
  await dbConnect();
  const token = cookies().get("token");

  try {
    const user = await verifyUser(token?.value ?? "", true);

    if (user) {
      const res = await Post.find({ created: user._id });
      return NextResponse.json({ data: res }, { status: 200 });
    } else {
      return NextResponse.json("Нэвтрэнэ үү.", { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
export async function POST(req: NextRequest, params: { slug: string }) {
  await dbConnect();
  const token = cookies().get("token");
  let urls = req.url.split("/");
  let id = urls[urls.length - 1];

  try {
    const user = await verifyUser(token?.value ?? "", true);

    if (user) {
      const res = await Post.findById(id).populate({
        path: 'created',
        model: User
      });
      return NextResponse.json({ data: res }, { status: 200 });
    } else {
      return NextResponse.json("Нэвтрэнэ үү.", { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
