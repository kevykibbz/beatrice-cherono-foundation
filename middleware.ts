import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./lib/auth";

// Define the protected routes
const protectedRoutes = [
  "/dashboard",
  "/dashboard/(.*)", 
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user is admin
  if (!token?.user || token.user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
};


// Optionally limit the middleware to specific paths
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login page
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|images|icons|fonts).*)",
  ],
};
