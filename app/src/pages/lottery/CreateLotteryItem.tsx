import { useAppStore } from "@lavaz/store";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { regionData } from "@/data/region.data";
import { schedule } from "@/data/schedule.data";
import { store } from "@/store/store";
import type { Province } from "@/types/address.type";
import type { Region } from "@/types/region.type";
import CreateLotteryInput from "./CreateLotteryInput";

interface CreateLotteryItemProps {
  region: Region;
}

export default function CreateLotteryItem({ region }: CreateLotteryItemProps) {
  const [date] = useAppStore(store.datePicker, (s) => s.date);

  const list = schedule[date.getDay()][region];

  return (
    <Box className="space-y-0">
      <Text className="text-sm ms-4 border border-border w-fit px-2 py-0.5 rounded-t-md text-primary font-medium">
        {regionData[region]}
      </Text>
      <Box className="border border-border p-4 rounded-md">
        {list.map((l) => {
          return (
            <CreateLotteryInput
              key={`${region}-${l.province}`}
              id={`${region}-${l.province}--input`}
              title={l.label}
              region={region}
              province={l.province as Province}
            />
          );
        })}
      </Box>
    </Box>
  );
}
