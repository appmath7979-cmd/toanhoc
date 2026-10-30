import { useAppStore } from "@lavaz/store";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import { regionList } from "@/data/region.data";
import { useCreateReward, useGetReward } from "@/hooks/query/use-reward-query";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import CreateLotteryItem from "./CreateLotteryItem";

export default function CreateLottery() {
  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [reward, { setInitReward }] = useAppStore(store.reward, (s) => s);

  const at = fmtDate(date);

  const { data } = useGetReward(at);
  const { mutate } = useCreateReward();

  const initializedFor = useRef<string | null>(null);

  const handleSend = () => {
    console.log(reward);
    mutate({ at, reward_values: [...reward.mb, ...reward.mt, ...reward.mn] });
  };

  useEffect(() => {
    if (!data || initializedFor.current === at) return;
    initializedFor.current = at;

    if (data.status === 404 || data.status === 500) return;
    setInitReward(data.data.reward_values);
  }, [data, at, setInitReward]);

  console.log(reward);
  return (
    <Box className="max-w-7xl px-4 mx-auto space-y-4">
      <Text className="text-primary text-center capitalize text-xl font-semibold">
        Cập nhật kết quả xổ số ngày {at}
      </Text>
      <Box>
        {regionList.map((r) => (
          <CreateLotteryItem key={`${r}-inputs`} region={r} />
        ))}
      </Box>
      <Button size="xl" className="w-full justify-center" onClick={handleSend}>
        Cập nhật kết quả
      </Button>
    </Box>
  );
}
