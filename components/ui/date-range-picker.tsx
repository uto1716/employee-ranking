"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

export interface DateRange {
  from?: Date
  to?: Date
}

export function DateRangePicker({
  date,
  onDateChange,
}: {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[300px] justify-start text-left font-normal", !date?.from && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              `${format(date.from, "yyyy/MM/dd")} - ${format(date.to, "yyyy/MM/dd")}`
            ) : (
              format(date.from, "yyyy/MM/dd")
            )
          ) : (
            <span>日付を選択</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={onDateChange} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  )
}
