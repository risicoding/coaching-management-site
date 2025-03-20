"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

// Define form type based on the schema
const courseSchema = z.object({
  name: z.string(),
  pricing: z.string().transform((val) => Number(val)),
});

type CourseSchemaType = z.infer<typeof courseSchema>;

const AddCourseForm = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.course.create.useMutation({
    onSuccess: () => {
      utils.course.invalidate();
    },
  });
  const closeRef = useRef<HTMLButtonElement>(null); // Create ref for the close button

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      pricing: 0,
    },
  });

  const onSubmit = async (data: CourseSchemaType) => {
    await mutateAsync(data);
    closeRef.current?.click(); // Programmatically click to close the dialog
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter course name"
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
                  type="number"
                  {...field}
                  placeholder="Enter course price"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Add Course
        </Button>

        {/* Hidden DialogClose button */}
        <DialogClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};

const AddCourseDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-3/4">
        <AddCourseForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
