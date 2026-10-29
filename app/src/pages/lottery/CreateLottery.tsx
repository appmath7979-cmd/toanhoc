import { useAppStore } from "@lavaz/store";
import Box from "@/components/ui/layouts/Box";
import { regionList } from "@/data/region.data";
import { store } from "@/store/store";
import CreateLotteryItem from "./CreateLotteryItem";

export default function CreateLottery() {
  const [reward] = useAppStore(store.reward, (s) => s);

  console.log(reward);
  return (
    <Box>
      {regionList.map((r) => (
        <CreateLotteryItem key={`${r}-inputs`} region={r} />
      ))}
    </Box>
  );
}
