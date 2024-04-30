import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Гарлаа.",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    response.cookies.delete("verified");

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `${error}`, success: false },
      { status: 500 }
    );
  }
}
