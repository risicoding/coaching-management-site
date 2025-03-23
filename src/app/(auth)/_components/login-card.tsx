"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import LoginForm from "./login-form";
import Link from "next/link";
import { authClient } from "@/auth/client";
import { useSearchParams } from "next/navigation";
import { env } from "@/env";
import { logger } from "@/lib/logger";

const LoginCard = () => {
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url");

  const handleGoogleSignIn = () => {
    authClient.signIn
      .social({
        provider: "google",
        callbackURL: redirectUrl ?? new URL('/api/onbaord',env.NEXT_PUBLIC_BETTER_AUTH_URL).toString()
      })
      .then((data) => logger.log(data))
      .catch((error) => logger.error(error));
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Use your google account or email</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="flex w-full items-center gap-2"
          onClick={() => {
            handleGoogleSignIn();
          }}
        >
          <FaGoogle className="text-lg" />
          Login with Google
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <LoginForm />
      </CardContent>

      <CardFooter className="flex items-center justify-center text-center text-sm text-muted-foreground">
        <span>Don’t have an account?</span>
        <span>
          <Link href="/signup" className="ml-1 text-primary hover:underline">
            Sign up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
