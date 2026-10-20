import { useAppStore } from "@lavaz/store";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import RegionDropdown from "@/components/system/RegionDropdown";
import { Button } from "@/components/ui/Button";
import Editor from "@/components/ui/editor/Editor";
import Label from "@/components/ui/form/Label";
import Box from "@/components/ui/layouts/Box";
import Container from "@/components/ui/layouts/Container";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { schedule } from "@/data/schedule.data";
import { useCreateMessage } from "@/hooks/query/use-message-query";
import { useGetSettingByCustomerId } from "@/hooks/query/use-setting-query";
import { parseMessageToDetails } from "@/libs/helper/message-parser";
import { fmtDate } from "@/libs/utils/fmt-date";
import { store } from "@/store/store";
import type { Province } from "@/types/address.type";
import type {
  CreateMessage,
  CreateMessageDetails,
  MessageDetail,
} from "@/types/message.type";

export default function Message() {
  const { id } = useParams();

  const {
    data: setting,
    error,
    isPending: settingPending,
  } = useGetSettingByCustomerId(id ?? "");
  const { mutate, isPending } = useCreateMessage(id);

  const [region] = useAppStore(store.region, (s) => s.value);
  const [date] = useAppStore(store.datePicker, (s) => s.date);

  const [msgDetails, setMsgDetails] = useState<MessageDetail[]>([]);
  const [msgStr, setMsgStr] = useState<string>("");
  const [canSend, setCanSend] = useState<boolean>(false);
  const [canCheck, setCanCheck] = useState<boolean>(false);

  const provinces = schedule[date.getDay()][region];

  const handleGetMsgString = useCallback((msg: string) => {
    setMsgStr(msg);
    setCanCheck(false);
  }, []);

  useEffect(() => {
    if (!msgStr) {
      setCanCheck(false);
      setCanSend(false);
    } else setCanCheck(true);
  }, [msgStr]);

  const handleSend = async () => {
    if (!id) return;

    const parseData = (): CreateMessageDetails[] => {
      const bets = setting?.data?.bets ?? [];

      const results = msgDetails.map((item) => {
        let co: number;
        let isPercent: boolean;
        const isFound = bets.find((b) => b.bet_type === item.bet_type);

        if (isFound) {
          isPercent = isFound.percent;
          switch (item.bet_type) {
            case "b2":
              co = isPercent
                ? isFound.c[region] * (region === "mb" ? 27 : 18)
                : isFound.c[region];
              break;
            case "b3":
              co = isPercent
                ? isFound.c[region] * (region === "mb" ? 23 : 17)
                : isFound.c[region];
              break;
            case "b4":
              co = isPercent
                ? isFound.c[region] * (region === "mb" ? 20 : 16)
                : isFound.c[region];
              break;
            // case "da":
            // case "dd2":
            // case "dd3":
            default:
              co = isFound.c[region];
              break;
          }
        } else {
          switch (item.bet_type) {
            case "b2":
              co = 0.7 * (region === "mb" ? 27 : 18);
              break;
            case "b3":
              co = 0.7 * (region === "mb" ? 23 : 17);
              break;
            case "b4":
              co = 0.7 * (region === "mb" ? 20 : 16);
              break;
            // case "da":
            // case "dd2":
            // case "dd3":
            default:
              co = 0.7;
              break;
          }
        }
        co = co * item.score * 100;

        const { trung: _t, ...rest } = item;

        return {
          ...rest,
          co,
        };
      });

      return results;
    };

    const data: CreateMessage = {
      content: msgStr,
      customer_id: id,
      is_send: false,
      message_details: parseData(),
      region: region,
      at: fmtDate(date),
    };

    mutate(data);
  };

  const handleConvertMsgToDetails = () => {
    const newDetails = parseMessageToDetails(msgStr, provinces, region);
    setMsgDetails(newDetails);
    setCanSend(true);
    setCanCheck(false);
  };

  useEffect(() => {
    if (settingPending) return;
    if (error || !setting?.success) {
      toast.error(
        setting?.message ?? error?.message ?? "Đã xảy ra lỗi tải cài đặt",
      );
      // navigate("/customers", { replace: true });
    }
  }, [error, setting, settingPending]);

  return (
    <Container>
      <RegionDropdown />
      <Flex aria-disabled={isPending}>
        <Button disabled>Kiểm tra tin</Button>
        <Button
          variant={msgStr && canCheck ? "primary" : "outline"}
          disabled={!msgStr || !canCheck || isPending}
          onClick={handleConvertMsgToDetails}
        >
          Xác nhận tin nhắn
        </Button>
        <Button
          variant={!canSend ? "outline" : "primary"}
          disabled={!canSend || isPending}
          onClick={handleSend}
        >
          Gửi tin
        </Button>
      </Flex>
      <Flex justify="center" className="gap-2">
        {provinces.map((p) => (
          <Text
            key={`${p.province}-${region}`}
            className="border rounded-md border-border px-2 py-1 inline-flex items-center gap-2"
          >
            <Text as="span">{p.label}</Text>
            <Text as="span">{p.province}</Text>
          </Text>
        ))}
      </Flex>
      <Flex justify="start" className="items-start" direction="vertical">
        <Label htmlFor="message-input">Nhập tin nhắn</Label>
        <Editor
          id="message-input"
          provinces={provinces.map((item) => item.province as Province)}
          isNorthern={region === undefined || region === "mb"}
          onMessageChange={handleGetMsgString}
        />
      </Flex>

      <Box>
        <Text className="font-medium">Kiểm tra thông tin tin nhắn</Text>
        <Box>
          <Text className="font-medium">Tổng số tin: {msgDetails.length}</Text>
          <Box className="space-x-2 space-y-1">
            {msgDetails.map((item, i) => {
              const key = `${item.province}-${item.number}-${item.syntax}-${item.score}-${i}`;
              return (
                <Flex
                  key={key}
                  display="inline-flex"
                  className="items-baseline-last gap-1.5 border border-border rounded-md shadow-md px-2 py-1"
                >
                  <Text as="span">{item.province}</Text>
                  <Text as="span">{item.number}</Text>
                  <Text as="span">{item.syntax}</Text>
                  <Text as="span">{item.score}</Text>
                </Flex>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
