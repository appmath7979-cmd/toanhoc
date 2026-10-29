import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { regionData } from "@/data/region.data";
import type { Schedule } from "@/data/schedule.data";
import { cn } from "@/libs/utils/cn";
import type { Region } from "@/types/region.type";

interface LotteryBoxProps {
  region: Region;
  list: Schedule[];
}

export default function LotteryBox({ region, list }: LotteryBoxProps) {
  return (
    <Box>
      <Text className="font-medium">{regionData[region]}</Text>
      <Box className="border rounded-md border-border">
        <Box className="flex items-center p-2 bg-accent">
          <Text className="text-center font-semibold">Giải</Text>
          <Box
            className={cn("grid grid-cols-3", region === "mb" && "grid-cols-1")}
          >
            {list.map((l) => (
              <Text
                key={`${l.province}-${region}`}
                className="text-center font-semibold"
              >
                {l.label}
              </Text>
            ))}
          </Box>
        </Box>
        <Box className="p-2">a</Box>
      </Box>
    </Box>
  );
}
