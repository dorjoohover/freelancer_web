"use server";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";

import User from "@/models/user.model";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/config/getDataFromToken";
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const cookie = cookies();
    let user = await User.findOne({ email: data.email?.toLowerCase() });
    if (user) {
      return NextResponse.json(
        { message: "Бүртгэлтэй байна.", success: false },
        {
          status: 201,
        }
      );
    } else {
      const password = jwt.sign(
        data.password,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );

      const res = await User.create({
        password: password,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email.toLowerCase(),
        phone: data.phone,
      });

      const token = jwt.sign(
        res._id.toString(),
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      );

      cookie.set("token", token);
      cookie.set("verified", res.verified);
      return NextResponse.json(
        { message: "Амжилттай.", success: true },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `${error}` });
  }
}
