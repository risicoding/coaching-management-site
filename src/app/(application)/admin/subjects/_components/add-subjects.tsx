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
import { daysEnum } from "@/server/db/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WeekdayPicker } from "./week-day-picker";

export const AddSubjectsDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogTitle>Add new Subject</DialogTitle>
        <AddSubjectForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  name: z.string(),
  pricing: z.coerce.number(),
  classId: z.string().optional(),
  days: z.array(daysEnum),
  time: z.string().optional(),
});

const AddSubjectForm = () => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const utils = api.useUtils();
  void utils.classes.getAll.prefetch();

  const { mutateAsync } = api.subjects.create.useMutation({
    onSuccess: async () => {
      void utils.subjects.getAll.invalidate();
      ref.current?.click();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pricing: undefined,
      classId: undefined,
      days: daysEnum.options.filter((val) => val !== "sun"),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await mutateAsync(data);
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
                <ClassesSelect
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

type ClassesSelectProps = {
  onChange: (value: string) => void;
  value: string | null | undefined;
  onBlur: () => void;
};
const ClassesSelect = ({ onChange, value, onBlur }: ClassesSelectProps) => {
  const { data: classesData } = api.classes.getAll.useQuery();

  return (
    <Select onValueChange={onChange} value={value ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select class" />
      </SelectTrigger>
      <SelectContent>
        {classesData?.map((itx) => (
          <SelectItem
            key={itx.id}
            value={itx.id}
          >{`Class ${itx.classNumber}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
