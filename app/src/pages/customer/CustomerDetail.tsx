import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import Box from "@/components/ui/layouts/Box";
import Text from "@/components/ui/typography/Text";
import Flex from "@/components/ui/layouts/Flex";

export default function CustomerDetail() {
  const { id } = useParams();

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
    </Box>
  );
}
