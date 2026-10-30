import { useAppStore } from "@lavaz/store";
import type React from "react";
import { useState } from "react";
import Label from "@/components/ui/form/Label";
import Textarea from "@/components/ui/form/Textarea";
import Flex from "@/components/ui/layouts/Flex";
import { parseRewardInput, rewardsToText } from "@/libs/helper/reward-generate";
import { store } from "@/store/store";
import type { Province } from "@/types/address.type";
import type { Region } from "@/types/region.type";

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

  const [value, setValue] = useState<string>(() =>
    rewardsToText(
      region,
      reward.filter((item) => item.province === province),
    ),
  );

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    if (!input) {
      setValue("");
      return;
    }

    const { text, rewards } = parseRewardInput(region, input);

    setValue(text);
    setReward(
      region,
      rewards.map((r) => ({ province, region, ...r })),
    );
  };

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
