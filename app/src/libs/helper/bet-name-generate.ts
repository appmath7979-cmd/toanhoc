import type { BetType } from "@/types/setting.type";

export function nameGenerate(bet_type: BetType): string {
  let setName: string;
  switch (bet_type) {
    case "b2":
    case "b3":
    case "b4":
      setName = "Bao";
      break;
    case "dd2":
      setName = "Đầu Đuôi";
      break;
    case "dd3":
      setName = "Xỉu Chủ";
      break;
    case "da":
      setName = "Đá Thẳng";
      break;
    case "dax":
      setName = "Đá Xiên";
      break;
    default:
      setName = "Bao";
      break;
  }

  return setName;
}
