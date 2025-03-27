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

export const SubjectsMenu = () => {
  return (
    <Tabs defaultValue="home">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>

      <TabsContent value="home">
        <Card>
          <CardHeader>
            <CardTitle>Home</CardTitle>
            <CardDescription>Welcome to the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Home content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="attendance">
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>View your attendance records.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Attendance details go here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tests">
        <Card>
          <CardHeader>
            <CardTitle>Tests</CardTitle>
            <CardDescription>Check your test results.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test information goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="fees">
        <Card>
          <CardHeader>
            <CardTitle>Fees</CardTitle>
            <CardDescription>Manage your fee payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Fee payment details go here.</p>
          </CardContent>
          <CardFooter>
            <Button>Pay Now</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
