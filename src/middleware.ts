import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicUrls =
    path === "/signup" || path === "/login" || path === "/verifyemail";
  const token = request.cookies.get("Token")?.value || "";
  if (publicUrls && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!publicUrls && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile/:id",
    "/login",
    "/signup",
    "/verifyemail",
  ],
};
