import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { nameGenerate } from "@/libs/helper/bet-name-generate";
import type { Syntax } from "@/types/message.type";
import type { Region } from "@/types/region.type";
import type { BetType } from "@/types/setting.type";
import SettingCustomerLimitInput from "./SettingCustomerLimitInput";

interface SettingCustomerLimitBoxProps {
  item: {
    bet_type: string;
    syntax: string;
  };
  schedule: {
    label: string;
    province_name: string;
  }[];
  currentRegion: Region;
}

export default function SettingCustomerLimitBox({
  item,
  schedule,
  currentRegion,
}: SettingCustomerLimitBoxProps) {
  const nameType = nameGenerate(item.bet_type as BetType);
  const list =
    item.bet_type === "dax"
      ? schedule.filter((s) => s.province_name.includes("-"))
      : schedule.filter((s) => !s.province_name.includes("-"));

  const title =
    item.bet_type === "dd2" || item.bet_type === "dd3"
      ? nameType.split(" ")[
          item.syntax === "dau" || item.syntax === "xdau" ? 0 : 1
        ]
      : nameType;

  return (
    <Box className="">
      <Text className="font-medium">{title}</Text>
      <Box className="grid grid-cols-3 gap-4">
        {list?.map((s) => (
          <SettingCustomerLimitInput
            key={`${s.province_name}-${item.syntax}`}
            title={s.label}
            currentRegion={currentRegion}
            bet_type={item.bet_type as BetType}
            syntax={item.syntax as Syntax}
            province_name={s.province_name}
          />
        ))}
      </Box>
    </Box>
  );
}
