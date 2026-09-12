export function dateFmt(date: Date): string {
	const fmted = date.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	return fmted;
}

export function monthFmt(date: Date): string {
	const fmted = date.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "2-digit",
	});
	return fmted;
}
