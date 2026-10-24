import { ChevronsDownIcon, ChevronsUpIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import {
  messageCalculate,
  messageParseForCalculate,
} from "@/libs/helper/message-calculate";
import { cn } from "@/libs/utils/cn";
import type { MessageRes } from "@/types/message.type";
import TitleStat from "../../others/TitleStatistic";
import Actions from "./Actions";

interface MessageDetailItemProps {
  message: MessageRes;
  msgTableTextCss: Record<string, string>;
}

export default function MessageDetailItem({
  message,
  msgTableTextCss,
}: MessageDetailItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  const allDetails = message.message_details;

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
    <Box className="border border-border rounded-md bg-surface-0 p-1 pb-0">
      <Flex justify="justify-between" className="w-full items-baseline">
        <Link to={`/customers/${message.customer_id}/message/${message.id}`}>
          <Text className="line-clamp-3 grow text-sm">{message.content}</Text>
        </Link>
        <Actions msgContent={message.content} id={message.id} />
      </Flex>
      <Box className={cn("smooth overflow-hidden", open ? "h-auto" : "h-0")}>
        <Box className="space-y-0">
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
        <Flex className="message-row bg-surface-2 border-t border-border">
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
      <Button
        variant="ghost"
        className="w-full justify-center"
        onClick={() => setOpen(!open)}
      >
        {open ? "Thu nhỏ" : "Chi tiết"}
        {open ? <ChevronsUpIcon /> : <ChevronsDownIcon />}
      </Button>
    </Box>
  );
}
