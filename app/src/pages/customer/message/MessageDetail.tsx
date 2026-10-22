import { SquarePenIcon, TrashIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import DeleteAlert from "@/components/system/dialog/DeleteAlert";
import { Button } from "@/components/ui/Button";
import { AlertTrigger } from "@/components/ui/dialog/Alert";
import Box from "@/components/ui/layouts/Box";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { useGetMessageById } from "@/hooks/query/use-message-query";

export default function MessageDetail() {
  const { customer_id, message_id } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useGetMessageById(message_id);
  const messageData = data?.data;

  if (isError) {
    if (data?.status === 404) {
      toast.error(data?.message);
      navigate(`/customer/${customer_id}`);
    } else toast.error(data?.message);
  }

  return (
    <Box>
      <Flex justify="justify-end" className="w-full items-center gap-2">
        <Button variant="outline" size="sm">
          <SquarePenIcon />
          Sửa tin
        </Button>
        <DeleteAlert
          title="Xóa tin"
          description="Bạn muốn xóa tin này! Điều này sẽ xóa tin nhắn và không thể hoàn tác."
        >
          <AlertTrigger asChild>
            <Button variant="outline" size="sm" danger>
              <TrashIcon />
              Xóa tin
            </Button>
          </AlertTrigger>
        </DeleteAlert>
      </Flex>
      <Box className="h-30 border border-border rounded-md bg-surface-1 p-4">
        {messageData?.content}
      </Box>
      <Box>
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
          <ul className="max-h-100 overflow-y-auto">
            {messageData?.message_details?.map((m, i) => {
              const key = `${m.province}-${m.bet_type}-${m.number}-${m.score}-${i}`;
              return (
                <Flex key={key} className="msg-detail even:bg-surface-1">
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
