"use server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
export async function verifyUser(token: string) {
  await dbConnect();
  try {

    const decodeToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);

    const user = await User.findById(decodeToken);
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
