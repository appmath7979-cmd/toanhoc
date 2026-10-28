import { CopyIcon, SendIcon, SettingsIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import ButtonGroup from "@/components/ui/button/ButtonGriup";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Tooltip from "@/components/ui/Tooltip";
import Text from "@/components/ui/typography/Text";
import { copyToClipboard } from "@/libs/helper/copy-to-clipboard";
import type { Limit } from "@/types/limit.type";
import type {
  CreateMessage,
  CreateMessageDetails,
  MessageRes,
} from "@/types/message.type";
import type { Region } from "@/types/region.type";

interface LayoffProps {
  id: string;
  messages: MessageRes[];
  limits: Limit[];
  date: string;
  region: Region;
}

export default function Layoff({
  id,
  messages,
  limits,
  date,
  region,
}: LayoffProps) {
  const layoffList = useMemo(() => {
    const layoffMessages = messages.map((m) => {
      const listLayoff: Array<CreateMessageDetails> = m.message_details
        .map((item) => {
          const layoff = limits.find(
            (l) =>
              l.bet_type === item.bet_type &&
              l.province_name === item.province &&
              l.syntax === item.syntax,
          )?.value;
          if (layoff === 0 || !layoff) return undefined;
          const {
            trung: _t,
            created_at: _cr,
            updated_at: _up,
            message_id: _m,
            id: _id,
            ...rest
          } = item;

          return { ...rest, score: rest.score - layoff, co: 0 };
        })
        .filter((item) => item !== undefined);

      return listLayoff;
    });

    const list: CreateMessage[] = layoffMessages.map((item) => {
      const content: string = item
        .map((c) => `${c.province} ${c.number} ${c.syntax} ${c.score}`)
        .join(" ");

      return {
        at: date,
        content,
        customer_id: id,
        message_details: item,
        region,
        send: true,
      };
    });
    return list.filter((item) => item.content);
  }, [region, date, messages, limits, id]);

  return (
    <div>
      <Button variant="outline" setChild>
        <Link to={`/customers/limit/${id}`}>
          <SettingsIcon />
          Cài đặt
        </Link>
      </Button>
      <Box className="space-y-4">
        {layoffList.length === 0 ? (
          <Text className="font-semibold text-center">
            Không có tin dư chuẩn
          </Text>
        ) : (
          layoffList.map((item, i) => {
            const key = `${item.content}-${i}`;
            return (
              <Flex
                key={key}
                justify="justify-between"
                className="border rounded-md border-border py-1 px-2"
              >
                <Text className="truncate">{item.content}</Text>
                <ButtonGroup>
                  <Tooltip content="Sao chép">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.content)}
                    >
                      <CopyIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Gửi tin">
                    <Button size="sm" variant="ghost">
                      <SendIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Flex>
            );
          })
        )}
      </Box>
    </div>
  );
}
