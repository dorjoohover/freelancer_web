"use server";
import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import { cookies } from "next/headers";
import User from "@/models/user.model";
import { verifyUser } from "../auth/verifyUser";

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = cookies().get("token");
  try {
    const user = await verifyUser(token?.value ?? "", true);

    if (user) {
      return NextResponse.json({ data: user, success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Нэвтрэнэ үү.", success: false },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}`, success: false });
  }
}
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const cookie = cookies();
    const token = cookie.get("token");
    if (token?.value != "" && token?.value != null) {
      const user = await verifyUser(token?.value ?? "");

      if (user) {
        await User.create(data);
        return NextResponse.json({ message: "Амжилттай." }, { status: 201 });
      } else {
        return NextResponse.json({ message: "Нэвтрэнэ үү." }, { status: 201 });
      }
    } else {
      return NextResponse.json({ message: "Нэвтрэнэ үү." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
