import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { isProtectedRoute } from "./lib/auth-config";

export default withAuth(
  function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", req.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only check auth for protected routes
        return !isProtectedRoute(req.nextUrl.pathname) || !!token;
      },
    },
  }
);

// Configure which routes to run middleware on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
