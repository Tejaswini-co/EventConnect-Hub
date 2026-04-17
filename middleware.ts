import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const profileComplete = (token as { profileComplete?: boolean }).profileComplete;
  const isDeactivated = (token as { isDeactivated?: boolean }).isDeactivated;

  if (isDeactivated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("deactivated", "1");
    return NextResponse.redirect(loginUrl);
  }

  if (!profileComplete && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding/profile", request.url));
  }

  if (profileComplete && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/explore",
    "/events/:path*",
    "/connections",
    "/chat/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/onboarding/:path*"
  ]
};
