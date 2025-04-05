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
import { daysEnum, subjectInsertSchema } from "@/server/db/schemas";
import { WeekdayPicker } from "./week-day-picker";
import { SelectClass } from "./select-class";

export const EditSubjectsDialog = ({
  children,
  subjectId,
}: {
  children: React.ReactNode;
  subjectId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-full px-3 sm:w-3/4 sm:p-6">
        <DialogTitle>Edit Subject</DialogTitle>
        <EditSubjectForm subjectId={subjectId} />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = subjectInsertSchema
  .partial()
  .extend({
    pricing: z.coerce.number(),
    time: z.string(),
    days: z.array(daysEnum),
    classId: z.string().optional(),
  })
  .omit({ createdAt: true, updatedAt: true, id: true });

const EditSubjectForm = ({ subjectId }: { subjectId: string }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const utils = api.useUtils();

  const { data: subjectData, isLoading } =
    api.subjects.getById.useQuery(subjectId);

  const { mutateAsync } = api.subjects.update.useMutation({
    onSuccess: async () => {
      void utils.subjects.getById.invalidate();
      ref.current?.click();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subjectData?.name,
      pricing: subjectData?.pricing,
      days: subjectData?.days,
      classId: subjectData?.classId ?? "other",
      time: subjectData?.time ?? undefined,
    },
  });

  const disabled = isLoading || form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await mutateAsync({
      id: subjectId,
      data: {
        ...data,
        classId: data.classId === "other" ? null : data.classId,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
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
                <Input {...field} type="number" disabled={disabled} />
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
                <WeekdayPicker {...field} disabled={disabled} />
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
                <Input {...field} type="time" disabled={disabled} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled}>
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            "Update Subject"
          )}
        </Button>
        <DialogClose className="hidden" ref={ref} />
      </form>
    </Form>
  );
};
