import { NextRequest, NextResponse } from "next/server";

import { getRole } from "@/lib/roles";

export const GET = async (req: NextRequest) => {
  const role = await getRole();

  const baseUrl = process.env.VERCEL_URL;

  if (role === "student")
    return NextResponse.redirect(new URL("/dashboard/courses", baseUrl));

  if (role === "admin")
    return NextResponse.redirect(new URL("/admin/courses", baseUrl));

  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
};
