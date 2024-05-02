"use server";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";

import { cookies } from "next/headers";
import User from "@/models/user.model";
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);

    let id = searchParams.get("id");
    const users = await User.findById(id);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const cookie = cookies();
    // let id = searchParams.get('id')
    const user = await User.findOne({
      $or: [
        {
          email: `${data.username}`.toLowerCase(),
        },
        {
          username: `${data.username}`.toLowerCase(),
        },
      ],
    });

    if (user != null) {
      const decodedPassword = jwt.verify(
        user.password,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );

      if (data.password == decodedPassword) {
        const token = jwt.sign(
          user._id.toString(),
          process.env.NEXT_PUBLIC_JWT_SECRET as string
        );

        cookie.set("token", token);
        cookie.set("verified", user.verified);
        cookie.set("type", user.type);
        return NextResponse.json(
          {
            success: true,
            message: "Амжилттай",
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Нууц үг буруу байна.",
          },
          {
            status: 401,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Бүртгэлгүй байна.",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
