"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentsInsertSchema } from "@/server/db/schemas";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { HandCoins, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { downloadPdf } from "@/components/invoice/invoice";
import { getInvoiceNumber, setInvoiceNumber } from "@/actions/invoice-number";

export const CreatePayments = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create a payment <HandCoins />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create new payment</DialogTitle>
        <CreatePaymentsForm />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = paymentsInsertSchema.extend({
  userId: z.string(),
  amount: z.coerce.number(),
  subjects: z.array(z.string()),
});

const CreatePaymentsForm = () => {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const utils = api.useUtils();

  // Fetch all users for the user selection dropdown
  const { data: users } = api.users.getAll.useQuery();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      // Default to the first day of the current month (yyyy-mm-dd)
      month: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0],
    },
  });

  // Watch selected userId to refetch subjects dynamically
  const userId = form.watch("userId");

  // Get subjects based on selected user
  const { data: subjects } = api.subjects.getByUserId.useQuery(userId);

  // Reset selected subjects when user changes
  useEffect(() => {
    form.resetField("subjects");
  }, [userId, form]);

  const formSubjects = form.watch("subjects");

  // Auto-calculate and update amount based on selected subjects
  useEffect(() => {
    if (!subjects || !formSubjects) return;

    if (formSubjects.length === 0) {
      form.setValue("amount", 0);
      return;
    }

    // Find matching subjects by ID
    const selectedSubjects = subjects.filter((sub) =>
      formSubjects.includes(sub.id),
    );

    if (selectedSubjects.length === 0) return;

    // Sum up the pricing of selected subjects
    const amount = selectedSubjects.reduce(
      (total, sub) => total + sub.pricing,
      0,
    );
    form.setValue("amount", amount);
  }, [formSubjects, subjects, form]);

  const { mutateAsync } = api.payments.create.useMutation({
    onSuccess: async () => {
      void utils.payments.invalidate();
      closeRef.current?.click();
      setInvoiceNumber();
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const invoiceNumber = await getInvoiceNumber();
    console.log(invoiceNumber);

    const user = utils.users.getAll
      .getData()
      ?.find((user) => user.id === data.userId);

    if (!user) return;

    const selectedSubjects = subjects
      ?.filter((sub) => data.subjects.includes(sub.id))
      .map((sub) => ({
        subject: sub.name,
        month: data.month,
        pricing: sub.pricing,
      }));

    if (!selectedSubjects) return;

    downloadPdf({
      invoiceNumber:
        Array.from({ length: 3 - invoiceNumber.toString().length })
          .map(() => "0")
          .join("") + invoiceNumber.toString(),
      invoiceDate: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      studentName: user.name,
      studentEmail: user.email,
      subjects: selectedSubjects,
    });

    console.log(data);

    await mutateAsync({ ...data, invoiceNumber });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* USER SELECTION */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                {users ? (
                  <div className="w-full">
                    <UserSelect
                      value={field.value}
                      onChange={field.onChange}
                      users={users.filter((user) => user.role === "student")}
                    />
                  </div>
                ) : (
                  <Loader2 className="animate-spin" />
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
                {subjects ? (
                  <MultiSelect
                    options={subjects.map((sub) => ({
                      label: sub.name,
                      value: sub.id,
                    }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select subjects"
                  />
                ) : (
                  <Loader2 className="animate-spin" />
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
              <FormLabel>Amount</FormLabel>
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
              <FormLabel>Month of payment</FormLabel>
              <FormControl>
                <MonthSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
        <DialogClose ref={closeRef} />
      </form>
    </Form>
  );
};

export default CreatePayments;
