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
import SignupForm from "./signup-form";
import Link from "next/link";

const SignupCard = () => {
  return (
    <Card >
      <CardHeader className="text-center">
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Use your google account or email</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button variant="outline" className="flex w-full items-center gap-2">
          <FaGoogle className="text-lg" />
          Sign up with Google
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <SignupForm />
      </CardContent>

      <CardFooter className="text-center flex items-center justify-center text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <span>
          <Link href='/login' className="ml-1 text-primary hover:underline">Login</Link>
        </span>
      </CardFooter>
    </Card>
  );
};

export default SignupCard;
