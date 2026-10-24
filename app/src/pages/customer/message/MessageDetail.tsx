import { SquarePenIcon, TrashIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import DeleteAlert from "@/components/system/dialog/DeleteAlert";
import { Button } from "@/components/ui/Button";
import { AlertTrigger } from "@/components/ui/dialog/Alert";
import Editor from "@/components/ui/editor/Editor";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { schedule } from "@/data/schedule.data";
import {
  useDeleteMessage,
  useGetMessageById,
  useUpdateMessage,
} from "@/hooks/query/use-message-query";
import { useGetSettingByCustomerId } from "@/hooks/query/use-setting-query";
import { useMessage } from "@/hooks/use-message";
import { parseMessageToDetails } from "@/libs/helper/message-parser";
import { cn } from "@/libs/utils/cn";
import { convertDate } from "@/libs/utils/fmt-date";
import type { Province } from "@/types/address.type";
import type { UpdateMessageReq } from "@/types/message.type";

export default function MessageDetail() {
  const { customer_id, message_id } = useParams();
  const navigate = useNavigate();

  const { data, isError } = useGetMessageById(message_id);
  const { data: setting } = useGetSettingByCustomerId(customer_id);
  const { mutate: deleteMsg } = useDeleteMessage();
  const { mutate: updateMsg } = useUpdateMessage();

  const [isEdit, setIsEdit] = useState(false);
  const [msg, setMsg] = useState(data?.data.content ?? "");
  const [canCheck, setCanCheck] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const { parseData, setMsgDetails } = useMessage({ bets: setting?.data.bets });

  const messageData = data?.data;

  const date = convertDate(messageData?.at ?? "", "day");
  const provinces = schedule[date][messageData?.region ?? "mb"];

  const handleGetMsgString = useCallback(
    (msgStr: string) => {
      if (messageData?.content === msgStr.trim()) {
        setCanCheck(false);
        setCanSend(false);
      } else {
        setMsg(msgStr);
        setCanCheck(true);
        setCanSend(false);
      }
    },
    [messageData?.content],
  );

  const handleConvertMsgToDetails = () => {
    const newDetails = parseMessageToDetails(msg, provinces, data?.data.region);
    setMsgDetails(newDetails);
    setCanSend(true);
    setCanCheck(false);
  };

  const handleSend = async () => {
    if (!message_id) return;

    const paresedData = parseData();

    const data: UpdateMessageReq = {
      content: msg,
      message_details: paresedData,
    };
    updateMsg({ id: message_id, data });
  };

  if (isError) {
    if (data?.status === 404) {
      toast.error(data?.message);
      navigate(`/customer/${customer_id}`);
    } else toast.error(data?.message);
  }

  return (
    <Box>
      <Flex justify="justify-end" className="w-full items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEdit((prev) => !prev)}
        >
          <SquarePenIcon />
          Sửa tin
        </Button>
        <DeleteAlert
          title="Xóa tin"
          description="Bạn muốn xóa tin này! Điều này sẽ xóa tin nhắn và không thể hoàn tác."
        >
          <AlertTrigger asChild onClick={() => deleteMsg(message_id ?? "")}>
            <Button variant="outline" size="sm" danger>
              <TrashIcon />
              Xóa tin
            </Button>
          </AlertTrigger>
        </DeleteAlert>
      </Flex>
      {isEdit ? (
        <Box className="space-y-4">
          <Editor
            id="editor-edit-message"
            provinces={provinces.map((item) => item.province as Province)}
            isNorthern={messageData?.region === "mb"}
            onMessageChange={handleGetMsgString}
            content={messageData?.content}
          />
          <Flex className="gap-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setIsEdit(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              disabled={!canCheck}
              className="w-full"
              variant={canCheck ? "primary" : "ghost"}
              onClick={handleConvertMsgToDetails}
            >
              Kiểm tra tin nhắn
            </Button>
            <Button
              className="w-full"
              disabled={!canSend}
              variant={canSend ? "primary" : "ghost"}
              onClick={handleSend}
            >
              Gửi tin
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box className="h-30 border border-border rounded-md bg-surface-1 p-4">
          {messageData?.content}
        </Box>
      )}
      <Box className="mt-4 space-y-2">
        <Text className="font-semibold">Chi tiết</Text>
        <Box className="border border-border rounded-md">
          <Flex className="msg-detail *:font-medium bg-surface-1">
            <Text as="span">Đài</Text>
            <Text as="span">Số/Cặp đánh</Text>
            <Text as="span">Cú pháp</Text>
            <Text as="span">Điểm</Text>
            <Text as="span">Dư</Text>
            <Text as="span">Tổng</Text>
          </Flex>
          <ul
            className={cn(
              "overflow-y-auto",
              isEdit ? "max-h-88" : "max-h-100 ",
            )}
          >
            {messageData?.message_details?.map((m) => {
              return (
                <Flex key={m.id} className="msg-detail even:bg-surface-1">
                  <Text as="span">{m.province}</Text>
                  <Text as="span">{m.number}</Text>
                  <Text as="span">{m.syntax}</Text>
                  <Text as="span" className="text-blue-600 font-medium">
                    {m.score}
                  </Text>
                  <Text as="span" className="text-red-600 font-medium">
                    0
                  </Text>
                  <Text as="span" className="text-emerald-600 font-medium">
                    {m.score}
                  </Text>
                </Flex>
              );
            })}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
