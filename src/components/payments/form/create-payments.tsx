"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentsInsertSchema } from "@/server/db/schemas";
import { z } from "zod";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSelect } from "./user-select";
import { api } from "@/trpc/react";
import { MultiSelect } from "@/components/multi-select";
import MonthSelect from "./month-select";
import { HandCoins } from "lucide-react";

const CreatePayments = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Create a payment <HandCoins />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreatePaymentsForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = paymentsInsertSchema.extend({
  amount: z.coerce.number(),
  subjects: z.array(z.string()),
});

export const CreatePaymentsForm = () => {
  const { data: users } = api.users.getAll.useQuery();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      month: new Date().toISOString().split("T")[0],
    },
  });

  const { data: subjects } = api.subjects.getByUserId.useQuery(
    form.getValues("userId"),
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* USER SELECTION */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                {users && (
                  <UserSelect
                    value={field.value}
                    onChange={field.onChange}
                    users={users}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBJECT SELECTION */}
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                {subjects && (
                  <MultiSelect
                    options={subjects.map((sub) => ({
                      label: sub.name,
                      value: sub.id,
                    }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select subjects"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AMOUNT */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Amount"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* MONTH SELECTION */}
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MonthSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreatePayments;
