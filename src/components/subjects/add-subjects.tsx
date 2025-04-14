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
import { DialogClose } from "@radix-ui/react-dialog";
import { daysEnum, subjectInsertSchema } from "@/server/db/schemas";
import { WeekdayPicker } from "./week-day-picker";
import { convertToAMPM } from "@/lib/format-time";
import { SelectClass } from "./select-class";
import { useCreateSubject } from "@/hooks/subjects";

export const AddSubjectsDialog = ({
  children,
  classId,
}: {
  children: React.ReactNode;
  classId?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-full px-3 sm:w-3/4 sm:p-6">
        <DialogTitle>Add new Subject</DialogTitle>
        <AddSubjectForm classId={classId} />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = subjectInsertSchema
  .extend({
    pricing: z.coerce.number(),
    time: z.string().transform((val) => convertToAMPM(val)),
    days: z.array(daysEnum),
    classId: z.string().optional(),
  })
  .omit({ createdAt: true, updatedAt: true, id: true });

const AddSubjectForm = ({ classId }: { classId?: string }) => {
  const ref = useRef<HTMLButtonElement | null>(null);


  const { mutateAsync } = useCreateSubject()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pricing: undefined,
      classId,
      days: daysEnum.options.filter((val) => val !== "sun"),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await mutateAsync({
      ...data,
      classId: data.classId === "other" ? null : data.classId,
    },{onSettled:()=>ref.current?.click()});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter subject name"
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
          name="pricing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter pricing"
                  disabled={form.formState.isSubmitting}
                  type="number"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <SelectClass
                  onChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days</FormLabel>
              <FormControl>
                <WeekdayPicker
                  onChange={field.onChange}
                  value={field.value}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Select time"
                  type="time"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Add Subject"
          )}
        </Button>
        <DialogClose className="hidden" ref={ref} />
      </form>
    </Form>
  );
};
