"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  SheetClose,
} from "@/components/ui/sheet";

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
import { useToggleStore } from "@/store/edit-course-sheet";

// Define form schema
const courseSchema = z.object({
  name: z.string(),
  pricing: z.string().transform((val) => Number(val)),
});

type CourseSchemaType = z.infer<typeof courseSchema>;

export const EditCourseForm = ({ id }: { id: number }) => {
  const utils = api.useUtils();
  const { data: course } = api.course.fetchById.useQuery({ id });
  const { mutateAsync } = api.course.update.useMutation({
    onSuccess: () => utils.course.invalidate(),
  });
  const closeRef = useRef<HTMLButtonElement>(null); // Ref for SheetClose button

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      pricing: 0,
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name,
        pricing:course.pricing
      });
    }
  }, [course, form]);

  const onSubmit = async (data: CourseSchemaType) => {
    await mutateAsync({...data,id});
    closeRef.current?.click(); // Close the sheet after submission
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
        Edit Course
        </Button>

        {/* Hidden SheetClose button */}
        <SheetClose ref={closeRef} className="hidden" />
      </form>
    </Form>
  );
};
