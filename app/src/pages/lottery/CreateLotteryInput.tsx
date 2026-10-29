import { useAppStore } from "@lavaz/store";
import type React from "react";
import { useEffect, useState } from "react";
import Label from "@/components/ui/form/Label";
import Textarea from "@/components/ui/form/Textarea";
import Flex from "@/components/ui/layouts/Flex";
import { parseToStr, splited } from "@/libs/helper/reward-generate";
import { store } from "@/store/store";
import type { Province } from "@/types/address.type";
import type { Region } from "@/types/region.type";
import type { RewardRank, RewardValue } from "@/types/reward.type";

interface CreateLotteryInputProps {
  title: string;
  id: string;
  region: Region;
  province: Province;
}

export default function CreateLotteryInput({
  title,
  id,
  region,
  province,
}: CreateLotteryInputProps) {
  const [reward, { setReward }] = useAppStore(store.reward, (s) => s[region]);

  const [value, setValue] = useState(() => {
    if (reward.length === 0) return "";
    const exists = reward.find((item) => item.province === province);
    if (!exists) return "";
    return exists.values;
  });
  const [tempValue, setTempValue] = useState("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (!newValue) {
      setValue("");
      setTempValue("");
      return;
    }

    let valueStr: string = "";
    let valueRewards: { rank: RewardRank; values: string[] }[] = [];

    if (region === "mb") {
      const cleanValue = newValue.replace(/[\p{L}\s]+/gu, " ").trim();
      const splitValue = cleanValue.split(" ");

      const { g1, g2, g3, g4, g5, g6, g7, gdb } = splited(region, splitValue);

      valueStr = parseToStr(
        region,
        Array.isArray(gdb) ? gdb.join(", ") : gdb,
        Array.isArray(g1) ? g1.join(", ") : g1,
        Array.isArray(g2) ? g2?.join(", ") : g2,
        Array.isArray(g3) ? g3?.join(", ") : g3,
        Array.isArray(g4) ? g4?.join(", ") : g4,
        Array.isArray(g5) ? g5?.join(", ") : g5,
        Array.isArray(g6) ? g6?.join(", ") : g6,
        Array.isArray(g7) ? g7?.join(", ") : g7,
      );

      valueRewards = [
        { rank: "gDB", values: Array.isArray(gdb) ? gdb : [gdb] },
        { rank: "g1", values: Array.isArray(g1) ? g1 : [g1] },
        { rank: "g2", values: Array.isArray(g2) ? g2 : [g2] },
        { rank: "g3", values: Array.isArray(g3) ? g3 : [g3] },
        { rank: "g4", values: Array.isArray(g4) ? g4 : [g4] },
        { rank: "g5", values: Array.isArray(g5) ? g5 : [g5] },
        { rank: "g6", values: Array.isArray(g6) ? g6 : [g6] },
        { rank: "g7", values: Array.isArray(g7) ? g7 : [g7] },
      ];
    } else {
      const splitValue = newValue.trim().split(/[\s]/g);

      const { g1, g2, g3, g4, g5, g6, g7, gdb, g8 } = splited(
        region,
        splitValue,
      );

      valueStr = parseToStr(
        region,
        Array.isArray(gdb) ? gdb.join(", ") : gdb,
        Array.isArray(g1) ? g1.join(", ") : g1,
        Array.isArray(g2) ? g2.join(", ") : g2,
        Array.isArray(g3) ? g3.join(", ") : g3,
        Array.isArray(g4) ? g4.join(", ") : g4,
        Array.isArray(g5) ? g5.join(", ") : g5,
        Array.isArray(g6) ? g6.join(", ") : g6,
        Array.isArray(g7) ? g7.join(", ") : g7,
        Array.isArray(g8) ? g8.join(", ") : g8,
      );
      valueRewards = [
        { rank: "g8", values: Array.isArray(g8) ? g8 : [g8] },
        { rank: "g7", values: Array.isArray(g7) ? g7 : [g7] },
        { rank: "g6", values: Array.isArray(g6) ? g6 : [g6] },
        { rank: "g5", values: Array.isArray(g5) ? g5 : [g5] },
        { rank: "g4", values: Array.isArray(g4) ? g4 : [g4] },
        { rank: "g3", values: Array.isArray(g3) ? g3 : [g3] },
        { rank: "g2", values: Array.isArray(g2) ? g2 : [g2] },
        { rank: "g1", values: Array.isArray(g1) ? g1 : [g1] },
        { rank: "gDB", values: Array.isArray(gdb) ? gdb : [gdb] },
      ];
    }

    setTempValue(valueStr);
    setValue(newValue);

    const valueData: RewardValue[] = [];

    for (const value of valueRewards) {
      const { rank, values } = value;
      valueData.push({ province, region, rank, values });
    }

    setReward(region, valueData);
  };

  useEffect(() => {
    setValue(tempValue);
  }, [tempValue]);

  return (
    <Flex
      direction="vertical"
      justify="justify-center"
      className="items-start gap-2"
    >
      <Label htmlFor={id}>{title}</Label>
      <Textarea
        id={id}
        className="h-auto max-h-30"
        value={value}
        onChange={handleChangeValue}
      />
    </Flex>
  );
}
