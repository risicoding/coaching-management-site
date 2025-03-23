import { NextResponse, type NextRequest } from "next/server";

import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/auth";

import { env } from "./env";
import {
  authRoutes,
  adminRoutes,
  passwordRoutes,
  protectedRoutes,
  matchRoute,
} from "./lib/route";

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = matchRoute(pathName, authRoutes);
  const isPasswordRoute = matchRoute(pathName, passwordRoutes);
  const isProtectedRoute = matchRoute(pathName, protectedRoutes);
  const isAdminRoute = matchRoute(pathName, adminRoutes);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  if (!session) {
    if (isAuthRoute || isPasswordRoute) return NextResponse.next();
    if (isProtectedRoute || isAdminRoute) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set(
        "redirect_url",
        new URL(pathName, env.NEXT_PUBLIC_BETTER_AUTH_URL).toString(),
      );

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(
      new URL(
        session?.user.role === "admin" ? "/admin" : "/dashboard",
        request.url,
      ),
    );
  }

  if (isAdminRoute && (!session?.user || session.user.role !== "admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/admin/:path*"],
};
