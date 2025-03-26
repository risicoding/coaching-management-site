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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useRef } from "react";
import { Loader } from "lucide-react";
import { api } from "@/trpc/react";
import { DialogClose } from "@radix-ui/react-dialog";

export const AddClassDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogTitle>Add new class</DialogTitle>
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
  const ref = useRef<HTMLButtonElement | null>(null);
  const utils = api.useUtils();
  const { mutateAsync } = api.classes.create.useMutation({
    onSuccess: async () => {
      void utils.classes.getAll.invalidate();
      ref.current?.click();
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { classNo: undefined },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync({ classNumber: data.classNo });
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
        <DialogClose className="hidden" ref={ref} />
      </form>
    </Form>
  );
};

export default AddClassForm;
