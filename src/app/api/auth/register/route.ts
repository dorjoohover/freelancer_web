"use server";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";

import User from "@/models/user.model";
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();

    const password = jwt.sign(
      data.password,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
   
    await User.create({
      password: password,
      username: data.username.toLowerCase(), 
      email: data.email.toLowerCase(), 
      phone: data.phone, 

    });

    return NextResponse.json("Амжилттай.", {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  }
}
