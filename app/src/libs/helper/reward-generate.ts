import type { Region } from "@/types/region.type";
import type { RewardValue } from "@/types/reward.type";

export type RewardEntry = Pick<RewardValue, "reward_rank" | "values">;

interface RankSpec {
  reward_rank: RewardEntry["reward_rank"];
  /** Nhãn hiển thị trong textarea */
  label: string;
  /** Lấy các giá trị của giải này từ danh sách token */
  pick: (tokens: string[]) => string[];
}

const one = (value?: string): string[] => (value ? [value] : []);

// Tạo sẵn regex một lần cho mỗi kích thước, không tạo lại mỗi lần gõ phím
const chunked = (size: number) => {
  const re = new RegExp(`.{1,${size}}`, "g");
  return (value?: string): string[] => value?.match(re) ?? [];
};

const by2 = chunked(2);
const by3 = chunked(3);
const by4 = chunked(4);
const by5 = chunked(5);

// Miền Bắc: mỗi giải là một token, các giải nhiều số được cắt theo độ dài
const MB_LAYOUT: RankSpec[] = [
  { reward_rank: "gDB", label: "db", pick: (t) => one(t[0]) },
  { reward_rank: "g1", label: "g1", pick: (t) => one(t[1]) },
  { reward_rank: "g2", label: "g2", pick: (t) => by5(t[2]) },
  { reward_rank: "g3", label: "g3", pick: (t) => by5(t[3]) },
  { reward_rank: "g4", label: "g4", pick: (t) => by4(t[4]) },
  { reward_rank: "g5", label: "g5", pick: (t) => by4(t[5]) },
  { reward_rank: "g6", label: "g6", pick: (t) => by3(t[6]) },
  { reward_rank: "g7", label: "g7", pick: (t) => by2(t[7]) },
];

// Miền Trung / Nam: mỗi số là một token, theo vị trí cố định
const SOUTH_LAYOUT: RankSpec[] = [
  { reward_rank: "g8", label: "g8", pick: (t) => one(t[0]) },
  { reward_rank: "g7", label: "g7", pick: (t) => one(t[1]) },
  { reward_rank: "g6", label: "g6", pick: (t) => t.slice(2, 5) },
  { reward_rank: "g5", label: "g5", pick: (t) => one(t[5]) },
  { reward_rank: "g4", label: "g4", pick: (t) => t.slice(6, 13) },
  { reward_rank: "g3", label: "g3", pick: (t) => t.slice(13, 15) },
  { reward_rank: "g2", label: "g2", pick: (t) => one(t[15]) },
  { reward_rank: "g1", label: "g1", pick: (t) => one(t[16]) },
  { reward_rank: "gDB", label: "gdb", pick: (t) => one(t[17]) },
];

const layoutOf = (region: Region): RankSpec[] =>
  region === "mb" ? MB_LAYOUT : SOUTH_LAYOUT;

const tokenize = (region: Region, input: string): string[] =>
  region === "mb"
    ? input
        .replace(/[\p{L}\s]+/gu, " ")
        .trim()
        .split(" ")
    : input.trim().split(/\s/g);

/** Danh sách giải -> chuỗi hiển thị trong textarea */
export function rewardsToText(region: Region, rewards: RewardEntry[]): string {
  const labels = new Map(layoutOf(region).map((s) => [s.reward_rank, s.label]));

  return rewards
    .filter((r) => labels.has(r.reward_rank))
    .map((r) => `${labels.get(r.reward_rank)}: ${(r.values ?? []).join(", ")}`)
    .join("\n");
}

/** Chuỗi người dùng nhập -> danh sách giải + chuỗi đã định dạng để hiển thị */
export function parseRewardInput(
  region: Region,
  input: string,
): { text: string; rewards: RewardEntry[] } {
  const tokens = tokenize(region, input);

  const rewards = layoutOf(region).map(({ reward_rank, pick }) => ({
    reward_rank,
    values: pick(tokens).filter(Boolean),
  }));

  return { text: rewardsToText(region, rewards), rewards };
}
