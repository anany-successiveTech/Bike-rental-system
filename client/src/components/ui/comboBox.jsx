"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

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

const frameworks = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "pune", label: "Pune" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "surat", label: "Surat" },
  { value: "jaipur", label: "Jaipur" },

  // Famous Tier-2 Tourist Cities
  { value: "udaipur", label: "Udaipur" },
  { value: "jodhpur", label: "Jodhpur" },
  { value: "goa", label: "Goa" },
  { value: "shimla", label: "Shimla" },
  { value: "manali", label: "Manali" },
  { value: "varanasi", label: "Varanasi" },
  { value: "amritsar", label: "Amritsar" },
  { value: "khajuraho", label: "Khajuraho" },
  { value: "coorg", label: "Coorg" },
  { value: "darjeeling", label: "Darjeeling" },
];

const Combobox = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Location"}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
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

export default Combobox;
