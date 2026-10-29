import { useAppStore } from "@lavaz/store";
import type React from "react";
import { useEffect, useState } from "react";
import { Field } from "@/components/ui/form/Field";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { store } from "@/store/store";
import type { Limit } from "@/types/limit.type";
import type { Syntax } from "@/types/message.type";
import type { Region } from "@/types/region.type";
import type { BetType } from "@/types/setting.type";

interface SettingCustomerLimitInputProps {
  title: string;
  currentRegion: Region;
  bet_type: BetType;
  province_name: string;
  syntax: Syntax;
}

export default function SettingCustomerLimitInput({
  title,
  currentRegion,
  bet_type,
  province_name,
  syntax,
}: SettingCustomerLimitInputProps) {
  const [data, { setLimit }] = useAppStore(
    store.createLimit,
    (s) => s[currentRegion],
  );

  const storeValue = data.find(
    (i) =>
      i.bet_type === bet_type &&
      i.province_name === province_name &&
      i.syntax === syntax,
  )?.value;

  const [inputValue, setInputValue] = useState<string>(
    storeValue !== undefined ? storeValue.toString() : "0",
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const limit: Limit = {
      bet_type,
      province_name,
      syntax,
      region: currentRegion,
      value: parseFloat(newValue),
    };

    setLimit(currentRegion, limit);
  };

  useEffect(() => {
    const current = storeValue ?? 0;

    setInputValue((prev) =>
      parseFloat(prev) === current ? prev : current.toString(),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeValue]);

  return (
    <Box className="grid grid-rows-2 gap-2 p-3 rounded-md border border-border h-20 shadow-xs">
      <Text className="text-sm">{title}</Text>
      <Field
        type="number"
        min={0}
        step={"any"}
        value={inputValue}
        onChange={handleValueChange}
        className="w-full [&_input]:w-full"
      />
    </Box>
  );
}
