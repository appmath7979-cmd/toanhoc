import { useAppStore } from "@lavaz/store";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import RegionDropdown from "@/components/system/RegionDropdown";
import { Button } from "@/components/ui/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { useGetManyMessage } from "@/hooks/query/use-message-query";
import { cn } from "@/libs/utils/cn";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import MessageDetailItem from "./message/message-detail-item/MessageDetailItem";
import TitleStat from "./others/TitleStat";

export default function CustomerDetail() {
  const { id } = useParams();
  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [region] = useAppStore(store.region, (s) => s.value);
  const { data } = useGetManyMessage({
    at: fmtDate(date),
    id: id ?? "",
    region,
  });

  const messageList = data?.data ?? [];
  const allDetails = messageList.flatMap((msg) => msg.message_details ?? []);

  const messagesInfo = useMemo(() => {
    const caculate = (d: typeof allDetails) => {
      return d.reduce(
        (acc, item) => {
          acc.score += item.score ?? 0;
          acc.co += item.co ?? 0;
          acc.trung += item.trung ?? 0;

          return acc;
        },
        { score: 0, co: 0, trung: 0 },
      );
    };

    const b2 = allDetails.filter((item) => item.bet_type === "b2") ?? [];
    const b3 = allDetails.filter((item) => item.bet_type === "b3") ?? [];
    const dd2 = allDetails.filter((item) => item.bet_type === "dd2") ?? [];
    const dd3 = allDetails.filter((item) => item.bet_type === "dd3") ?? [];
    const b4 = allDetails.filter((item) => item.bet_type === "b4") ?? [];
    const da = allDetails.filter((item) => item.bet_type === "da") ?? [];

    return {
      b2: { ...caculate(b2) },
      b3: { ...caculate(b3) },
      b4: { ...caculate(b4) },
      dd2: { ...caculate(dd2) },
      dd3: { ...caculate(dd3) },
      da: { ...caculate(da) },
    };
  }, [allDetails]);

  const messagesKey = Object.keys(messagesInfo);

  const grandTotal = messagesKey.reduce(
    (acc, key) => {
      const info = messagesInfo[key as keyof typeof messagesInfo];
      if (info) {
        acc.score += info.score || 0;
        acc.co += info.co || 0;
        acc.trung += info.trung || 0;
      }
      return acc;
    },
    { score: 0, co: 0, trung: 0 },
  );

  if (!id) return;

  return (
    <Box>
      <RegionDropdown />
      <Button setChild>
        <Link to={`/customers/${id}/message`}>Thêm tin nhắn mới</Link>
      </Button>
      <Box className="border border-border rounded-md">
        <Box className="relative max-h-50 overflow-y-auto bg-surface-1">
          <TitleStat />
          <Box className="space-y-0">
            {messagesKey.map((m) => {
              const score = messagesInfo[m as keyof typeof messagesInfo].score;
              const co = messagesInfo[m as keyof typeof messagesInfo].co;
              const trung = messagesInfo[m as keyof typeof messagesInfo].trung;

              if (score === 0) return null;

              return (
                <Flex
                  key={`${m}-messages-quickk-stat`}
                  className="message-row bg-surface-2"
                >
                  <Text className={cn(msgTableTextCss.score)}>
                    {m}: {score.toLocaleString("vi-VN")}
                  </Text>
                  <Text className={cn(msgTableTextCss.co)}>
                    {m}: {co.toLocaleString("vi-VN")}
                  </Text>
                  <Text className={cn(msgTableTextCss.trung)}>
                    {m}: {trung.toLocaleString("vi-VN")}
                  </Text>
                </Flex>
              );
            })}
          </Box>
        </Box>
        <Flex className="message-row bg-surface-2">
          <Text className={cn(msgTableTextCss.score)}>
            {grandTotal.score.toLocaleString("vi-VN")}
          </Text>
          <Text className={cn(msgTableTextCss.co)}>
            {grandTotal.co.toLocaleString("vi-VN")}
          </Text>
          <Text className={cn(msgTableTextCss.trung)}>
            {grandTotal.trung.toLocaleString("vi-VN")}
          </Text>
        </Flex>
      </Box>
      <Box>
        <Text className="font-medium">Danh sách tin nhắn</Text>
        <Flex
          direction="vertical"
          justify="start"
          className="items-start w-full"
        >
          {messageList?.map((message) => (
            <MessageDetailItem
              key={message.id}
              message={message}
              msgTableTextCss={msgTableTextCss}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
