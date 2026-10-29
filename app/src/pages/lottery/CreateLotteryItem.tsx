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
    <Box className="max-w-7xl px-4 mx-auto">
      <Text>{regionData[region]}</Text>
      <Box>
        {list.map((l) => {
          console.log(l);
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
