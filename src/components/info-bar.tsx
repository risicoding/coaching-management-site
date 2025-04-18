import type { LucideIcon } from "lucide-react";
import React from "react";

interface InforBarProps {
  Icon: LucideIcon;
  header: string;
  children?: React.ReactNode;
}

export const InfoBar = ({ Icon, header, children }: InforBarProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-2">
        <Icon strokeWidth={2} />
        <h2 className="text-md font-semibold">{header}</h2>
      </div>
      <div className="flex">{children}</div>
    </div>
  );
};
