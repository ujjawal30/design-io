import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { signInNonAccessibleRoutes, signedInAccessibleRoutes } from "./constants/routes";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const {
      url,
      nextauth: { token },
      nextUrl: { pathname },
    } = req;

    if (token && signInNonAccessibleRoutes.includes(pathname)) return NextResponse.redirect(new URL("/dashboard", url));

    if (!token && signedInAccessibleRoutes.some((route) => pathname.startsWith(route))) return NextResponse.redirect(new URL("/auth/login", url));
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
