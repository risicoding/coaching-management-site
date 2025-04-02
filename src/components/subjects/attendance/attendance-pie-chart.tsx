"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: { label: "Count" },
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AttendancePieChart({
  present,
  totalCount,
}: {
  present: number;
  totalCount: number;
}) {
  const chartData = [
    { status: "present", count: present, fill: "#2bc42e" },
    {
      status: "absent",
      count: totalCount - present,
      fill: "#c42b2b",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={70}
        />
      </PieChart>
    </ChartContainer>
  );
}
