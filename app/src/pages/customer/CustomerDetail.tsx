import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import Flex from "@/components/ui/layouts/Flex";
import { useState } from "react";
import { cn } from "@/libs/utils/cn";

export default function CustomerDetail() {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  if (!id) return;

  return (
    <Box>
      <Button setChild>
        <Link to={`/customers/${id}/message`}>Thêm tin nhắn mới</Link>
      </Button>
      <Box className="relative rounded-md border border-border h-50 overflow-y-auto bg-surface-1">
        <Flex className="sticky top-0 *:flex-1 *:text-center *:font-medium *:py-1 bg-surface-0">
          <Text className="text-orange-600">Xác</Text>
          <Text className="border-x border-border text-blue-600">Cò</Text>
          <Text className="text-green-600">Trúng</Text>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
