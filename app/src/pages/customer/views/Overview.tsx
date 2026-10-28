import { useMemo } from "react";
import { Link } from "react-router-dom";
import RegionDropdown from "@/components/system/RegionDropdown";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { msgTableTextCss } from "@/data/css.data";
import {
  messageCalculate,
  messageParseForCalculate,
} from "@/libs/helper/message-calculate";
import { cn } from "@/libs/utils/cn";
import type { MessageDetailRes, MessageRes } from "@/types/message.type";
import TitleStatistic from "../../../components/others/TitleStatistic";
import MessageDetailItem from "../message/MessageDetailItem";

type OverviewProps = {
  messageList: MessageRes[];
  allDetails: MessageDetailRes[];
  id: string;
};

export default function Overview({
  allDetails,
  messageList,
  id,
}: OverviewProps) {
  const messagesInfo = useMemo(() => {
    const { b2, b3, dd2, dd3, b4, da } = messageParseForCalculate(allDetails);

    return {
      b2: { ...messageCalculate(b2) },
      b3: { ...messageCalculate(b3) },
      b4: { ...messageCalculate(b4) },
      dd2: { ...messageCalculate(dd2) },
      dd3: { ...messageCalculate(dd3) },
      da: { ...messageCalculate(da) },
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

  return (
    <Box className="mt-4">
      <Flex justify="justify-end" className="gap-4">
        <RegionDropdown />
        <Button setChild>
          <Link to={`/customers/${id}/message`}>Thêm tin nhắn mới</Link>
        </Button>
      </Flex>
      <Box className="border border-border rounded-md">
        <Box className="relative max-h-50 overflow-y-auto bg-surface-1">
          <TitleStatistic />
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
        <Flex direction="vertical" className="items-start w-full">
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
