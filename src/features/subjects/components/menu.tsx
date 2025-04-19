"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceMenuCard } from "@/features/attendance/components/attendance-menu-card";
import StudentsMenuCard from "./students-menu-card";
import { PaymentMenuCard } from "@/features/payments/components/subjectsmenu/payment-menu-card";

export const SubjectsMenu = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Use search param as initial tab value
  const initialTab = searchParams.get("tab") ?? "home";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", activeTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeTab, searchParams, router]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6 overflow-scroll"
    >
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
      </TabsList>

      <TabsContent value="home">
        <MenuCard header="Home" description="Welcome to the dashboard.">
          <p>Home content goes here.</p>
        </MenuCard>
      </TabsContent>

      <TabsContent value="attendance">
        <AttendanceMenuCard />
      </TabsContent>

      <TabsContent value="tests">
        <MenuCard header="Tests" description="Check your test results.">
          <p>Test info goes here.</p>
        </MenuCard>
      </TabsContent>

      <TabsContent value="payments">
        <PaymentMenuCard />
      </TabsContent>

      <TabsContent value="students">
        <MenuCard header="Students" description="Student details.">
          <StudentsMenuCard />
        </MenuCard>
      </TabsContent>
    </Tabs>
  );
};

interface MenuCardProps {
  header: string;
  description: string;
  children: React.ReactNode;
}

export const MenuCard = ({ header, description, children }: MenuCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
