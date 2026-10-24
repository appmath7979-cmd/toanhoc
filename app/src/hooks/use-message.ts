import { useAppStore } from "@lavaz/store";
import { useState } from "react";
import { store } from "@/store/store";
import type { CreateMessageDetails, MessageDetail } from "@/types/message.type";
import type { BetPair } from "@/types/setting.type";

export function useMessage({ bets }: { bets: BetPair[] | undefined }) {
  const [msgDetails, setMsgDetails] = useState<MessageDetail[]>([]);
  const [region] = useAppStore(store.region, (s) => s.value);

  const parseData = (): CreateMessageDetails[] => {
    const results = msgDetails.map((item) => {
      let co: number;
      let isPercent: boolean;
      const isFound = bets?.find((b) => b.bet_type === item.bet_type);

      if (isFound) {
        isPercent = isFound.percent;
        switch (item.bet_type) {
          case "b2":
          case "da":
            co = isPercent
              ? isFound.c[region] * (region === "mb" ? 27 : 18)
              : isFound.c[region];
            break;
          case "b3":
            co = isPercent
              ? isFound.c[region] * (region === "mb" ? 23 : 17)
              : isFound.c[region];
            break;
          case "b4":
            co = isPercent
              ? isFound.c[region] * (region === "mb" ? 20 : 16)
              : isFound.c[region];
            break;
          // case "dd2":
          // case "dd3":
          default:
            co = isFound.c[region];
            break;
        }
      } else {
        switch (item.bet_type) {
          case "b2":
          case "da":
            co = 0.7 * (region === "mb" ? 27 : 18);
            break;
          case "b3":
            co = 0.7 * (region === "mb" ? 23 : 17);
            break;
          case "b4":
            co = 0.7 * (region === "mb" ? 20 : 16);
            break;
          // case "dd2":
          // case "dd3":
          default:
            co = 0.7;
            break;
        }
      }
      co = co * item.score;

      const { trung: _t, ...rest } = item;

      return {
        ...rest,
        co,
      };
    });

    return results;
  };

  return { parseData, msgDetails, setMsgDetails };
}
