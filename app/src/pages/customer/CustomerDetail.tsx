import { useAppStore } from "@lavaz/store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import { useGetManyMessage } from "@/hooks/query/use-message-query";
import { cn } from "@/libs/utils/cn";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import CustomerLimit from "./views/CustomerLimit";
import Statistic from "./views/Statistic";

export default function CustomerDetail() {
  const { id } = useParams();

  const [currentView, setCurrentView] = useState<"statistic" | "limit">(
    "statistic",
  );

  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [region] = useAppStore(store.region, (s) => s.value);

  const { data } = useGetManyMessage({
    at: fmtDate(date),
    id: id ?? "",
    region,
  });

  const messageList = data?.data ?? [];
  const allDetails = messageList.flatMap((msg) => msg.message_details ?? []);

  if (!id) return;

  return (
    <Box>
      <Flex justify="justify-center" className="gap-2 items-center">
        <Button
          variant="outline"
          size="xl"
          className={cn(
            "w-full justify-center",
            currentView === "statistic" && "border-primary! text-primary!",
          )}
          onClick={() => setCurrentView("statistic")}
        >
          Thống kê
        </Button>
        <Button
          variant="outline"
          size="xl"
          className={cn(
            "w-full justify-center",
            currentView === "limit" && "border-primary! text-primary!",
          )}
          onClick={() => setCurrentView("limit")}
        >
          Dư chuẩn
        </Button>
      </Flex>

      {(currentView === "statistic" && (
        <Statistic id={id} allDetails={allDetails} messageList={messageList} />
      )) || <CustomerLimit id={id} allDetails={allDetails} />}
    </Box>
  );
}
