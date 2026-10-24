import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { msgTableTextCss } from "@/data/css.data";
import { cn } from "@/libs/utils/cn";

export default function TitleStatistic() {
  return (
    <Flex className="sticky top-0 *:py-1 bg-surface-0 message-row">
      <Text className={cn(msgTableTextCss.score)}>Xác</Text>
      <Text className={cn(msgTableTextCss.co)}>Cò</Text>
      <Text className={cn(msgTableTextCss.trung)}>Trúng</Text>
    </Flex>
  );
}
