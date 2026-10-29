import { useAppStore } from "@lavaz/store";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { regionList } from "@/data/region.data";
import { schedule } from "@/data/schedule.data";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import LotteryBox from "./LotteryBox";

export default function Lottery() {
  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const scheduleList = schedule[date.getDay()];

  return (
    <Box className="px-4">
      <Flex>
        <Button setChild>
          <Link to={"/lottery/create"}>
            <PlusIcon /> Cập nhật kết quả
          </Link>
        </Button>
      </Flex>
      <Text className="text-xl font-semibold capitalize text-primary text-center">
        Kết quả xổ số {fmtDate(date)}
      </Text>
      {regionList.map((r) => (
        <LotteryBox key={r} region={r} list={scheduleList[r]}></LotteryBox>
      ))}
    </Box>
  );
}
