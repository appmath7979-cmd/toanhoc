import { useAppStore } from "@lavaz/store";
import { useMemo, useState } from "react";
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

const msgTableTextCss = {
  score: "text-orange-600",
  co: "border-x border-border text-blue-600",
  trung: "text-green-600",
};

export default function CustomerDetail() {
  const { id } = useParams();
  const [date] = useAppStore(store.datePicker, (s) => s.date);
  const [region] = useAppStore(store.region, (s) => s.value);
  const { data } = useGetManyMessage({
    at: fmtDate(date),
    id: id ?? "",
    region,
  });
  const [open, setOpen] = useState<boolean>(false);

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
        <Box className="relative h-50 overflow-y-auto bg-surface-1">
          <Flex className="sticky top-0 *:py-1 bg-surface-0 message-row">
            <Text className={cn(msgTableTextCss.score)}>Xác</Text>
            <Text className={cn(msgTableTextCss.co)}>Cò</Text>
            <Text className={cn(msgTableTextCss.trung)}>Trúng</Text>
          </Flex>
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
          <Box className="border border-border rounded-md bg-surface-0 p-1 pb-0">
            <Flex justify="between" className="w-full">
              <Text className="truncate line-clamp-3 flex-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, iusto doloribus, consequuntur dolorum nobis adipisci
                animi architecto veritatis suscipit incidunt explicabo impedit,
                eligendi perferendis. Obcaecati, recusandae? Corporis unde iure
                ipsam.
              </Text>
              <Flex>
                <Button size="sm" variant="ghost">
                  Sao chép
                </Button>
                <Button size="sm" variant="ghost">
                  Sửa
                </Button>
                <Button size="sm" variant="ghost" danger>
                  Xóa
                </Button>
              </Flex>
            </Flex>
            <Box
              className={cn("smooth overflow-hidden", open ? "h-auto" : "h-0")}
            >
              <Box>
                <Flex className="sticky top-0 *:flex-1 *:text-center *:font-medium *:py-1 bg-surface-0">
                  <Text className="text-orange-600">Xác</Text>
                  <Text className="border-x border-border text-blue-600">
                    Cò
                  </Text>
                  <Text className="text-green-600">Trúng</Text>
                </Flex>
              </Box>
            </Box>
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={() => setOpen(!open)}
            >
              Chi tiết
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
