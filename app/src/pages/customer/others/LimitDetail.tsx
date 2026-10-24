import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import type { MessageDetailRes } from "@/types/message.type";

interface LimitDetailProps {
  index: number;
  detail: MessageDetailRes;
}

export default function LimitDetail({ index, detail }: LimitDetailProps) {
  return (
    <Flex className="msg-detail even:bg-surface-1">
      <Text as="span" className="w-20">
        {index + 1}
      </Text>
      <Text as="span">{detail.province}</Text>
      <Text as="span">{detail.number}</Text>
      <Text as="span">{detail.syntax}</Text>
      <Text as="span" className="text-blue-600 font-medium">
        {detail.score}
      </Text>
      <Text as="span" className="text-red-600 font-medium">
        0
      </Text>
      <Text as="span" className="text-emerald-600 font-medium">
        {detail.score}
      </Text>
    </Flex>
  );
}
