import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the path of the request
  const path = req.nextUrl.pathname;

  // Check if the path is a public path
  const isPublicPath =
    path === "/sign-in" || path === "/sign-up" || path === "/verification";

  // Get the verification token from the request cookies
  const verificationToken = req.cookies.get("verificationToken") || "";

  // Redirect to the profile page if the path is a public path and the verification token exists
  // if (isPublicPath && verificationToken) {
  //   return NextResponse.redirect(new URL("/profile", req.url));
  // }

  // Redirect to the sign-in page if the path is not a public path and the verification token does not exist
  // if (!isPublicPath && !verificationToken) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/verification", "/profile"],
};
