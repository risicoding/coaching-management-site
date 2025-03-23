"use client";

import type { Session } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authClient } from "@/auth/client";

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authClient.getSession().then(({ data }) => setSession(data));
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/signup">
        <Button>Signup</Button>
      </Link>

      {session && (
        <Link href={session?.user.role === "admin" ? "/admin" : "/dashbaord"}>
          <Button>Dashboard</Button>
        </Link>
      )}

      {session && (
        <Button
          onClick={() => {
            authClient.signOut();
          }}
        >
          Sign out
        </Button>
      )}
    </div>
  );
};

export default Page;
