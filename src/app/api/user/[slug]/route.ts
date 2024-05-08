import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { verifyUser } from "../../auth/verifyUser";
import Post from "@/models/post.model";
import User from "@/models/user.model";

export async function GET(req: NextRequest, params: { slug: string }) {
  await dbConnect();
  let urls = req.url.split("/");
  let id = urls[urls.length - 1].toLowerCase();
  console.log(id);
  try {
    const res = await User.findOne({ email: id });
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
