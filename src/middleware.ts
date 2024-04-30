// src/middleware.ts
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { UserType } from "./utils/enum";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicViews = ["/"];
  const view = publicViews.includes(path);
  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === "/login" || path === "/register";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";
  const verified = request.cookies.get("verified")?.value || false;
  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token && !view) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (path?.startsWith("/profile") && verified === "false") {
    if (!path?.startsWith("/profile/verify-email")) {
      return NextResponse.redirect(
        new URL("/profile/verify-email", request.nextUrl)
      );
    }
  } else {
    if (path?.startsWith("/profile/verify-email")) {
      return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }
  }
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
