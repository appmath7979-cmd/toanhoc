import { useAppStore } from "@lavaz/store";
import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import ButtonGroup from "@/components/ui/button/ButtonGriup";
import Input from "@/components/ui/form/Input";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { regionData } from "@/data/region.data";
import { provinceNameSchedule } from "@/data/schedule.data";
import { cn } from "@/libs/utils/cn";
import { store } from "@/store/store";
import type { Region } from "@/types/region.type";
import CustomerLimitInput from "./CustomerLimitInput";

export default function SettingCustomerLimit() {
  const [currentRegion, setCurrentRegion] = useState<Region>("mb");

  const [date] = useAppStore(store.datePicker, (s) => s.date);

  const provinces = provinceNameSchedule()[date.getDay()];

  const currentDataValues = provinces[currentRegion];

  return (
    <Box>
      <Text>Cài đặt cân hàng</Text>
      <Box>
        <ButtonGroup>
          <Button
            variant="outline"
            className={cn(
              currentRegion === "mb" && "text-primary! border-primary!",
            )}
            onClick={() => setCurrentRegion("mb")}
          >
            {regionData.mb}
          </Button>
          <Button
            variant="outline"
            className={cn(
              currentRegion === "mt" && "text-primary! border-primary!",
            )}
            onClick={() => setCurrentRegion("mt")}
          >
            {regionData.mt}
          </Button>
          <Button
            variant="outline"
            className={cn(
              currentRegion === "mn" && "text-primary! border-primary!",
            )}
            onClick={() => setCurrentRegion("mn")}
          >
            {regionData.mn}
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Flex justify="justify-between">
          <Text>Bao</Text>
          <button type="button">Áp dụng tất cả</button>
        </Flex>
        {currentDataValues.map((item) => {
          if (item.province_name.includes("-")) return null;

          return (
            <CustomerLimitInput
              key={`${item.province_name}-bao-${currentRegion}`}
              item={item}
              region={currentRegion}
              type="b2"
            />
          );
        })}
      </Box>
    </Box>
  );
}
