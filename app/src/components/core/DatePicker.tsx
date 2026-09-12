import { Popover } from "radix-ui";
import { Button } from "./button/Button";
import {
	CalendarDaysIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { IconButton } from "./button/IconButton";
import { dateFmt, monthFmt } from "@/libs/fmt";
import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { useMemo, useState } from "react";
import { cn } from "@/libs/utils/cn";

export function DatePicker() {
	const [date, { setDate }] = useAppStore(store.datePicker, (s) => s.date);
	const [dateView, setDateView] = useState<Date>(() =>
		date ? new Date(date) : new Date(),
	);

	const isMobile = useMobile();

	const fmt = dateFmt(date);
	const monthFmted = monthFmt(dateView);

	const calendar = useMemo(() => {
		const year = dateView.getFullYear();
		const month = dateView.getMonth();

		const startOfMonth = new Date(year, month + 1);
		const endOfMonth = new Date(year, month + 1, 0);

		const days: Date[] = [];

		const startDayIndex = (startOfMonth.getDay() + 6) % 7;

		const prevMonthLastDate = new Date(year, month, 0).getDate();
		for (let i = startDayIndex - 1; i >= 0; i--) {
			days.push(new Date(year, month - 1, prevMonthLastDate - i));
		}

		for (let i = 1; i <= endOfMonth.getDate(); i++) {
			days.push(new Date(year, month, i));
		}

		const totalCells = days.length <= 35 ? 35 : 42;
		const remainingDays = totalCells - days.length;
		for (let i = 1; i <= remainingDays; i++) {
			days.push(new Date(year, month + 1, i));
		}

		return days;
	}, [dateView]);

	const handleChangeMonth = (num: number) => {
		setDateView(new Date(dateView.getFullYear(), date.getMonth() + num, 1));
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				{isMobile ? (
					<IconButton>
						<CalendarDaysIcon />
					</IconButton>
				) : (
					<Button variant="outline">
						<CalendarDaysIcon />
						<span>{fmt}</span>
					</Button>
				)}
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="w-60 shadow-md bg-surface border p-1 rounded-md mx-4 my-1">
					<div className="flex justify-between items-center mb-1 border-b py-0.5">
						<IconButton
							variant="ghost"
							size="sm"
							onClick={() => handleChangeMonth(-1)}
						>
							<ChevronLeftIcon />
						</IconButton>
						<p className="text-sm font-semibold capitalize">{monthFmted}</p>
						<IconButton
							variant="ghost"
							size="sm"
							onClick={() => handleChangeMonth(1)}
						>
							<ChevronRightIcon />
						</IconButton>
					</div>
					<div className="font-medium uppercase text-xs text-muted-foreground grid grid-cols-7 text-center">
						<span>t2</span>
						<span>t3</span>
						<span>t4</span>
						<span>t5</span>
						<span>t6</span>
						<span>t7</span>
						<span className="text-primary">cn</span>
					</div>
					<div className="grid grid-cols-7">
						{calendar.map((d) => {
							const isSelected =
								d.toLocaleDateString() === date.toLocaleDateString();
							const isCurrentMonth = d.getMonth() === dateView.getMonth();

							return (
								<Popover.Close key={d.toLocaleDateString()} asChild>
									<IconButton
										variant="ghost"
										className={cn(
											"font-semibold text-muted-foreground bg-transparent text-sm hover:bg-primary/10",
											isSelected && "text-primary",
											!isCurrentMonth && "opacity-40",
										)}
										onClick={() => setDate(d)}
									>
										{d.getDate()}
									</IconButton>
								</Popover.Close>
							);
						})}
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
