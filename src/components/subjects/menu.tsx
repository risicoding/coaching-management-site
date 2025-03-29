import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceMenuCard } from "./attendance/attendance-menu-card";

export const SubjectsMenu = () => {
  return (
    <Tabs defaultValue="home" className="space-y 6 overflow-scroll">
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
          <p>Test infgoes here.</p>
        </MenuCard>
      </TabsContent>

      <TabsContent value="payments">
        <MenuCard header="Fees" description="Manage your fee payments.">
          <p>Fee payment details go here.</p>
          <CardFooter>
            <Button>Pay Now</Button>
          </CardFooter>
        </MenuCard>
      </TabsContent>

      <TabsContent value="students">
        <MenuCard header="Students" description="View your student details.">
          <p>Student details go here.</p>
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
