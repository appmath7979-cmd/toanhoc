import { useAppStore } from "@lavaz/store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import { useGetCustomerLimit } from "@/hooks/query/use-limit-query";
import { useGetManyMessage } from "@/hooks/query/use-message-query";
import { cn } from "@/libs/utils/cn";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import Layoff from "./views/Layoff";
import Overview from "./views/Overview";
import Statistic from "./views/Statistic";

export default function CustomerDetail() {
  const { id } = useParams();

  const [currentView, setCurrentView] = useState<
    "overview" | "statistic" | "limit"
  >("overview");

  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [region] = useAppStore(store.region, (s) => s.value);

  const day = date.getDay();

  const { data: messageData } = useGetManyMessage({
    at: fmtDate(date),
    id: id ?? "",
    region,
  });
  const { data: limitData } = useGetCustomerLimit({
    day,
    id: id ?? "",
    retry: 0,
  });

  const messageList = messageData?.data ?? [];
  const allDetails = messageList.flatMap((msg) => msg.message_details ?? []);

  const list =
    limitData?.data.limits.filter((item) => item.region === region) ?? [];

  if (!id) return;

  return (
    <Box className="px-4">
      <Flex justify="justify-center" className="gap-2 items-center text-sm!">
        <Button
          variant="outline"
          size="xl"
          className={cn(
            "w-full justify-center",
            currentView === "overview" && "border-primary! text-primary!",
          )}
          onClick={() => setCurrentView("overview")}
        >
          Tổng quan
        </Button>
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

      {(currentView === "overview" && (
        <Overview id={id} allDetails={allDetails} messageList={messageList} />
      )) ||
        (currentView === "limit" && (
          <Layoff
            id={id}
            messages={messageList}
            limits={list}
            date={fmtDate(date)}
            region={region}
          />
        )) || <Statistic allDetails={allDetails} limits={list} />}
    </Box>
  );
}
