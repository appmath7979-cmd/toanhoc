import { useAppStore } from "@lavaz/store";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Field } from "@/components/ui/form/Field";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { store } from "@/store/store";
import type { Limit } from "@/types/limit.type";
import type { Syntax } from "@/types/message.type";
import type { Region } from "@/types/region.type";
import type { BetType } from "@/types/setting.type";
import SettingCustomerLimitBox from "./SettingCustomerLimitBox";

interface SettingCustomerLimitGroupProps {
  c: string;
  currentRegion: Region;
  currentSchedule: {
    mb: {
      label: string;
      province_name: string;
    }[];
    mt: {
      label: string;
      province_name: string;
    }[];
    mn: {
      label: string;
      province_name: string;
    }[];
  };
  list: {
    bet_type: string;
    syntax: string;
  }[];
}

export default function SettingCustomerLimitGroup({
  c,
  currentRegion,
  currentSchedule,
  list,
}: SettingCustomerLimitGroupProps) {
  const [isSetAll, setIsSetAll] = useState(false);
  const [value, setValue] = useState<string>("0");

  const [, { setManyLimit }] = useAppStore(store.createLimit, (s) => s);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const parsed = parseFloat(newValue);
    if (Number.isNaN(parsed)) return;

    const limits: Limit[] = list.flatMap((item) => {
      // cùng quy tắc lọc với SettingCustomerLimitBox
      const provinces = currentSchedule[currentRegion].filter((s) =>
        item.bet_type === "dax"
          ? s.province_name.includes("-")
          : !s.province_name.includes("-"),
      );

      return provinces.map((s) => ({
        bet_type: item.bet_type as BetType,
        province_name: s.province_name,
        syntax: item.syntax as Syntax,
        region: currentRegion,
        value: parsed,
      }));
    });

    console.log(currentRegion, limits.length, limits[0]);
    setManyLimit(currentRegion, limits);
  };

  return (
    <Box key={c}>
      <Flex justify="justify-between" className="items-baseline w-full">
        <Text className="font-semibold">
          {c === "2c" ? "2 Càng" : c === "3c" ? "3 Càng" : "4 Càng"}
        </Text>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSetAll((prev) => !prev)}
        >
          Áp dụng tất cả
        </Button>
      </Flex>
      {isSetAll && (
        <Field value={value} min={0} step={"any"} onChange={handleChange} />
      )}
      {list.map((item) => (
        <SettingCustomerLimitBox
          key={`"2cang-box-${item.bet_type}-${item.syntax}`}
          item={item}
          currentRegion={currentRegion}
          schedule={currentSchedule[currentRegion]}
        />
      ))}
    </Box>
  );
}
