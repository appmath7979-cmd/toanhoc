import { useAppStore } from "@lavaz/store";
import { type ChangeEvent, useEffect, useState } from "react";
import { Field } from "@/components/ui/form/Field";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { store } from "@/store/store";
import type { Limit } from "@/types/limit.type";
import type { Region } from "@/types/region.type";
import type { BetType } from "@/types/setting.type";

interface CustomerLimitInputProps {
  item: {
    label: string;
    province_name: string;
  };
  region: Region;
  type: BetType;
}
export default function CustomerLimitInput({
  item,
  region,
  type,
}: CustomerLimitInputProps) {
  const [dataValue, { setLimit }] = useAppStore(
    store.createLimit,
    (s) => s[region],
  );
  const [value, setValue] = useState<string>(() => {
    if (dataValue.length === 0) return "0";
    const existing = dataValue.find(
      (v) =>
        v.value.province_name === item.province_name &&
        v.value.bet_type === type,
    );

    return existing?.value.value.toString() ?? "0";
  });

  const [err, setErr] = useState<string>(() => {
    if (dataValue.length === 0) return "";
    const existing = dataValue.find(
      (v) =>
        v.value.province_name === item.province_name &&
        v.value.bet_type === type,
    );

    return existing?.errStr ?? "";
  });

  useEffect(() => {
    console.log(parseFloat(value));
    const limit: Limit = {
      bet_type: type,
      province_name: item.province_name,
      region,
      value: parseFloat(value),
    };
    setLimit(region, limit);
  }, [type, item, value, region, setLimit]);

  useEffect(() => {
    const newErr = () => {
      if (dataValue.length === 0) return "";
      const existing = dataValue.find(
        (v) =>
          v.value.province_name === item.province_name &&
          v.value.bet_type === type,
      );

      return existing?.errStr ?? "";
    };

    setErr(newErr());
  }, [dataValue, item, type]);

  return (
    <Box>
      <Field
        id={`${item.label}-${type}`}
        label={item.label}
        value={value}
        min={0}
        step={"any"}
        type="number"
        onChange={(e) => setValue(e.target.value)}
        error={err}
      />
    </Box>
  );
}
