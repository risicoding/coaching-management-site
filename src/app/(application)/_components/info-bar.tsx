import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface InfoBarProps {
  icon: LucideIcon;
  header: string;
  buttonText: string;
  buttonIcon?: LucideIcon;
  onButtonClick: () => void;
}

const InfoBar = ({
  icon: Icon,
  header,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
}: InfoBarProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white shadow-md">
      {/* Left Section - Icon and Header */}
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-blue-400" />
        <span className="text-lg font-medium">{header}</span>
      </div>

      {/* Right Section - Button */}
      <Button
        onClick={onButtonClick}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
      >
        {ButtonIcon && <ButtonIcon className="h-5 w-5" />}
        {buttonText}
      </Button>
    </div>
  );
};

export default InfoBar;
