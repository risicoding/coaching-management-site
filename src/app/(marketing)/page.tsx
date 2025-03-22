import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen gap-6 flex-col items-center justify-center">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  );
};

export default Page;
