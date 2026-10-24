import { useAppStore } from "@lavaz/store";
import { CalendarIcon } from "lucide-react";
import { Popover } from "radix-ui";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { vi } from "react-day-picker/locale";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import { Button } from "./ui/button/Button";
import Box from "./ui/layouts/Box";
import Text from "./ui/typography/Text";

export default function DatePicker() {
  const [date, { setDate }] = useAppStore(store.datePicker, (s) => s.date);
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          <CalendarIcon />
          {fmtDate(date)}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 rounded-lg border border-border bg-surface-0 p-3 shadow-md"
        >
          <DayPicker
            mode="single"
            locale={vi}
            weekStartsOn={1}
            selected={date}
            onSelect={(d) => {
              setDate(d || new Date());
              setOpen(false);
            }}
            className="[--rdp-accent-color:var(--primary)] [--rdp-accent-background-color:var(--muted)]"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
