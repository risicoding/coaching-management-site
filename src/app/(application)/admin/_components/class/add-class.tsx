"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Loader } from "lucide-react";

export const AddClassDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-3/4">
        <AddClassForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  classNo: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Expected value more or equal to 1" }),
});

const AddClassForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Class added:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="classNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class No</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter class number"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Add Class"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddClassForm;
