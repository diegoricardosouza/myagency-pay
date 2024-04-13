import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
  label?: string;
}

export function DataPicker({ value, onChange, label }: DatePickerProps) {
  return (
    <>
      <span
        className="block text-sm text-muted-foreground mb-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              format(value, "dd/MM/yyyy")
            ) : (
              <span>Data de Ínicio</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => onChange?.(date ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
