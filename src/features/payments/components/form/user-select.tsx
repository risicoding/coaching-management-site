import { useState } from "react";
import { Check, ChevronDown, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User as UserType } from "@/features/users/api/types";

type UserSelectProps = {
  users: UserType[];
  value?: string;

  onChange: (value: string) => void;
  disabled?: boolean;
};

export const UserSelect = ({ users, value, onChange }: UserSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedUser = users.find((user) => user.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            {selectedUser?.image ? (
              <img
                src={selectedUser.image}
                className="size-5 rounded-full object-cover"
                alt={`user-${selectedUser.name}`}
              />
            ) : (
              <User className="size-5" />
            )}
            <span className="truncate">
              {selectedUser?.name ?? "Select user..."}
            </span>
          </div>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search users..." className="h-9" />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => {
                    onChange(user.id);
                    setOpen(false);
                  }}
                >
                  {user.name}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
