import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { verifyUser } from "@/app/api/auth/verifyUser";
import { UserStatus } from "@/utils/enum";

export async function POST(req: NextRequest, params: { slug: string }) {
  await dbConnect();
  const token = cookies().get("token");
  let urls = req.url.split("/");
  let id = urls[urls.length - 1];
  const data = await req.json();

  try {
    const user = await verifyUser(token?.value ?? "", true);

    if (user) {
      const res = await User.findByIdAndUpdate(
        user._id,
        id == "freelancer"
          ? {
              $set: {
                uInfo: data,
                status: UserStatus.VERIFIED,
              },
            }
          : {
              $set: {
                bInfo: data,
                status: UserStatus.VERIFIED,
              },
            }
      );

      cookies().set("status", UserStatus.VERIFIED);

      return NextResponse.json(
        { message: "Амжилттай", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Нэвтрэнэ үү.", success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `${error}`, success: false },
      { status: 500 }
    );
  }
}
