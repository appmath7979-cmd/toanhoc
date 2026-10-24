function fmtDate(date: Date) {
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function convertDate(
  dateStr: string,
  to: "date" | "day" | "month" | "year",
  format: "DD/MM/YYYY" | "MM/DD/YYYY" = "DD/MM/YYYY",
): number {
  const parts = dateStr.split(/[/-]/).map(Number);

  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return 0;
  }

  let day: number, month: number, year: number;

  if (format === "DD/MM/YYYY") {
    [day, month, year] = parts;
  } else {
    [month, day, year] = parts;
  }

  // Khởi tạo đối tượng Date (Lưu ý: Tháng trong JS bắt đầu từ 0 đến 11)
  const dateObj = new Date(year, month - 1, day);

  // Kiểm tra xem ngày tạo ra có hợp lệ hay không (tránh trường hợp truyền ngày 31/02)
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    throw new Error("Ngày tháng được cung cấp không tồn tại trên thực tế.");
  }

  // Trả về kết quả dựa trên tham số 'to'
  switch (to) {
    case "date":
      return dateObj.getDate(); // Trả về ngày trong tháng (1 - 31)
    case "day":
      return dateObj.getDay(); // Trả về thứ trong tuần (0: Chủ Nhật, 1: Thứ Hai, ...)
    case "month":
      return dateObj.getMonth() + 1; // Trả về tháng thực tế (1 - 12)
    case "year":
      return dateObj.getFullYear(); // Trả về năm (YYYY)
    default: {
      const _exhaustiveCheck: never = to;
      return _exhaustiveCheck;
    }
  }
}

export { convertDate, fmtDate };
