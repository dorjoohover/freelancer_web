import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { verifyUser } from "../../auth/verifyUser";
import Post from "@/models/post.model";

export async function GET(req: NextRequest, params: {slug: string}) {
    await dbConnect();
    const token = cookies().get('token')
    console.log(params.slug)
    try {
      const user = await verifyUser(token?.value ?? '', true);
  
      if (user) {
        const res = await Post.find({created: user._id});
        return NextResponse.json({data: res}, { status: 200 });
      } else {
        return NextResponse.json("Нэвтрэнэ үү.", { status: 201 });
      }
    } catch (error) {
      return NextResponse.json({ error: `${error}` });
    }
  }