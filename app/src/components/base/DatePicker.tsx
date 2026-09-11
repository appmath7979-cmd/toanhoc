import {
	CalendarFoldIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import { IconButton } from "../core/IconButton";
import { Popover } from "radix-ui";
import { useAppStore } from "@lavaz/store";
import { store } from "../../store/store";
import { dateFmt } from "../../utils/date-fmt";
import { useMobile } from "../../hooks/useMobile";
import { useMemo, useState } from "react";
import { cn } from "../../utils/cn";

export function DatePicker() {
	const [date, { setDate }] = useAppStore(store.datePicker, (s) => s.date);
	const isMobile = useMobile();

	const fmt = dateFmt(date);

	const [viewDate, setViewDate] = useState(() =>
		date ? new Date(date) : new Date(),
	);

	const calendarData = useMemo(() => {
		const year = viewDate.getFullYear();
		const month = viewDate.getMonth();

		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);

		const daysInMonth = lastDayOfMonth.getDate();
		let startingDayOfWeek = firstDayOfMonth.getDay();

		startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

		const days = [];
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i));
		}

		const monthNames = [
			"Tháng 1",
			"Tháng 2",
			"Tháng 3",
			"Tháng 4",
			"Tháng 5",
			"Tháng 6",
			"Tháng 7",
			"Tháng 8",
			"Tháng 9",
			"Tháng 10",
			"Tháng 11",
			"Tháng 12",
		];

		return {
			title: `${monthNames[month]} ${year}`,
			days,
		};
	}, [viewDate]);

	const handleChangeMonth = (type: "prev" | "next") => {
		setViewDate(
			new Date(
				viewDate.getFullYear(),
				type === "next" ? viewDate.getMonth() + 1 : viewDate.getMonth() - 1,
				1,
			),
		);
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild className="text-sm">
				{isMobile ? (
					<button type="button" className="btn-icon btn-icon--outline">
						<CalendarFoldIcon />
					</button>
				) : (
					<button
						type="button"
						className="btn btn-outline h-8 [&_svg]:size-4.5"
					>
						<CalendarFoldIcon />
						<span>{fmt}</span>
					</button>
				)}
			</Popover.Trigger>
			<Popover.PopoverPortal>
				<Popover.Content
					className="border rounded-md w-60 shadow-md bg-surface pb-1 border-border mt-1 mr-2"
					sideOffset={5}
				>
					<div className="w-full flex justify-between items-center p-2">
						<IconButton
							variant="ghost"
							onClick={() => handleChangeMonth("prev")}
						>
							<ChevronLeftIcon />
						</IconButton>
						<p className="font-semibold text-sm">{fmt}</p>
						<IconButton
							variant="ghost"
							onClick={() => handleChangeMonth("next")}
						>
							<ChevronRightIcon />
						</IconButton>
					</div>
					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-7 text-center text-xs text-muted-foreground font-medium">
							<span>T2</span>
							<span>T3</span>
							<span>T4</span>
							<span>T5</span>
							<span>T6</span>
							<span>T7</span>
							<span className="text-primary">CN</span>
						</div>
						<div className="grid grid-cols-7 text-sm px-1">
							{calendarData.days.map((d, index) => {
								if (!d) return <div key={`empty-${index}`} />;
								const isSelected =
									date && d.toLocaleDateString() === date.toLocaleDateString();

								return (
									<Popover.PopoverClose
										asChild
										key={`day-${d.toISOString()}`}
										onClick={() => setDate(d)}
									>
										{d && (
											<IconButton
												variant="ghost"
												className={cn(
													"hover:bg-primary/5 hover:text-primary",
													isSelected && "text-primary",
												)}
											>
												{d.getDate()}
											</IconButton>
										)}
									</Popover.PopoverClose>
								);
							})}
						</div>
					</div>
				</Popover.Content>
			</Popover.PopoverPortal>
		</Popover.Root>
	);
}
