import { useAppStore } from "@lavaz/store";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import { limitInputData } from "@/data/limit-input.data";
import { regionData, regionList } from "@/data/region.data";
import { provinceNameSchedule } from "@/data/schedule.data";
import {
  useCreateCustomerLimit,
  useGetCustomerLimit,
} from "@/hooks/query/use-limit-query";
import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import type { CreateCustomerLimit, Limit } from "@/types/limit.type";
import type { Region } from "@/types/region.type";
import SettingCustomerLimitGroup from "./SettingCustomerLimitGroup";

const cang = ["2c", "3c", "4c"];

export default function SettingCustomerLimit() {
  const { id } = useParams();

  const ref = useRef(false);

  const [currentRegion, setCurrentRegion] = useState<Region>("mb");

  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [value, { setInitLimit, resetData }] = useAppStore(
    store.createLimit,
    (s) => s,
  );

  const day = date.getDay();
  const currentSchedule = provinceNameSchedule()[day];

  const { data } = useGetCustomerLimit({
    day,
    id: id ?? "",
    retry: 0,
  });
  const { mutate } = useCreateCustomerLimit(
    data?.data?.customer_id ?? id ?? "",
  );

  const two = limitInputData["2c"];
  const three = limitInputData["3c"];
  const four = limitInputData["4c"];

  const handleSend = () => {
    const limits: Limit[] = [...value.mb, ...value.mn, ...value.mt];
    const payload: CreateCustomerLimit = {
      day,
      customer_id: data?.data?.customer_id ?? id ?? "",
      limits,
    };

    mutate(payload);
    resetData();
  };

  useEffect(() => {
    if (!data || data.status === 500 || ref.current) return;
    if (data.status === 404) {
      ref.current = true;
      return;
    }

    const limitData = data.data.limits;

    setInitLimit(limitData);
    ref.current = true;
  }, [data, setInitLimit]);

  return (
    <Box className="px-4 space-y-2">
      <Flex className="w-full gap-2">
        {regionList.map((item) => (
          <Button
            key={item}
            variant="outline"
            size="lg"
            className={cn(
              "w-1/3 justify-center",
              currentRegion === item && "border-primary! text-primary!",
            )}
            onClick={() => setCurrentRegion(item)}
          >
            {regionData[item]}
          </Button>
        ))}
      </Flex>
      <Box>
        {cang.map((c) => {
          const list = c === "2c" ? two : c === "3c" ? three : four;
          return (
            <SettingCustomerLimitGroup
              key={c}
              c={c}
              currentRegion={currentRegion}
              currentSchedule={currentSchedule}
              list={list}
            />
          );
        })}
      </Box>
      <Button size="xl" className="w-full justify-center" onClick={handleSend}>
        Lưu thông tin
      </Button>
    </Box>
  );
}
