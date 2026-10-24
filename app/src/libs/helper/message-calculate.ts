import type { MessageDetailRes } from "@/types/message.type";

export function messageCalculate(d: MessageDetailRes[]) {
  return d.reduce(
    (acc, item) => {
      acc.score += item.score ?? 0;
      acc.co += item.co ?? 0;
      acc.trung += item.trung ?? 0;

      return acc;
    },
    { score: 0, co: 0, trung: 0 },
  );
}

export function messageParseForCalculate(d: MessageDetailRes[]) {
  const b2 = d.filter((item) => item.bet_type === "b2") ?? [];
  const b3 = d.filter((item) => item.bet_type === "b3") ?? [];
  const dd2 = d.filter((item) => item.bet_type === "dd2") ?? [];
  const dd3 = d.filter((item) => item.bet_type === "dd3") ?? [];
  const b4 = d.filter((item) => item.bet_type === "b4") ?? [];
  const da = d.filter((item) => item.bet_type === "da") ?? [];

  return { b2, b3, dd2, dd3, b4, da };
}
