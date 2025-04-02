import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/auth/client";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { logger } from "@/lib/logger";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectUrl = searchParams.get("redirect_url");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    logger.log('Form data',data);
    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      logger.error(error);
      form.setError("email", { type: "validate", message: error.message });
      form.setError("password", { type: "validate", message: error.message });
      return;
    }

    logger.log(signInData);

    if (redirectUrl) {
    return  router.push(redirectUrl);
    }

    const { data: session } = await authClient.getSession();
    router.push(session?.user.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
