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
import React, { useRef } from "react";
import { Loader } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAllClasses, useUpdateClass } from "../hooks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const EditClassDialog = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { data } = useAllClasses();

  const classNo = data?.find((c) => c.id === id)?.classNumber;
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetTitle>Edit class {classNo}</SheetTitle>
        <EditClassForm id={id} classNo={classNo} />
      </SheetContent>
    </Sheet>
  );
};

const formSchema = z.object({
  classNo: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: "Expected value more or equal to 1" }),
});

export const EditClassForm = ({
  id,
  classNo,
}: {
  id: string;
  classNo?: number;
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const { mutate, isPending } = useUpdateClass();

  const form = useForm({
    defaultValues: { classNo },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({ id, classNumber: data.classNo });
    ref.current?.click();
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
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || isPending}
        >
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
