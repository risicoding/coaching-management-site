"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { daysEnum } from "@/server/db/schemas";
import type { z } from "zod";
import { api } from "@/trpc/react";
import { useState } from "react";

type JoinCardProps = {
  subjectId: string;
  name: string;
  pricing: number;
  days: z.infer<typeof daysEnum>[];
};

export const JoinCard = ({ name, pricing, subjectId }: JoinCardProps) => {
  const { mutateAsync } = api.subjects.enroll.useMutation();
  const [loading, setLoading] = useState(false);

  const handleMutate = async () => {
    setLoading(true);
    try {
      console.log("Enrolling in subject:", subjectId);
      await mutateAsync(subjectId);
      console.log("Successfully enrolled in subject:", subjectId);
    } catch (error) {
      console.error("Error enrolling in subject:", error);
      alert("Failed to enroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-muted/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{pricing}</p>
        {/* TODO: Render days */}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleMutate}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

