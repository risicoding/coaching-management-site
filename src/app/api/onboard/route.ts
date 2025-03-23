import { auth } from "@/auth";
import { env } from "@/env";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.redirect(constructUrl("/login"));
  }

  if (session.user.role === "admin") {
    return NextResponse.redirect(constructUrl("/admin"));
  }

  return NextResponse.redirect(constructUrl("/dashboard"));
};

const constructUrl = (path: string) =>
  new URL(path, env.NEXT_PUBLIC_BETTER_AUTH_URL);
