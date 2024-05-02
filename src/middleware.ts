// src/middleware.ts
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { UserStatus, UserType } from "./utils/enum";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicViews = ["/"];
  const view = publicViews.includes(path);
  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === "/login" || path === "/register";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";
  const status = request.cookies.get("status")?.value || UserStatus.CREATED;
  const type = request.cookies.get("type")?.value || "";
  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (
    token &&
    type == UserType.FREELANCER &&
    status == UserStatus.CREATED &&
    !path?.startsWith("/profile/create")
  ) {
    return NextResponse.redirect(
      new URL("/profile/create/resume", request.nextUrl)
    );
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token && !view) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // if (path?.startsWith("/profile/edit") && verified === UserStatus.) {
  //   if (!path?.startsWith("/profile/verify-email")) {
  //     return NextResponse.redirect(
  //       new URL("/profile/verify-email", request.nextUrl)
  //     );
  //   }
  // } else {
  //   if (path?.startsWith("/profile/verify-email") && verified === "true") {
  //     return NextResponse.redirect(new URL("/profile", request.nextUrl));
  //   }
  // }
}

// It specifies the paths for which this middleware should be executed.
// In this case, it's applied to '/', '/profile', '/login', and '/signup'.
export const config = {
  matcher: [
    "/",
    "/admin",
    "/login",
    "/register",
    "/profile/:path*",
    "/post/:path*",
  ],
};
