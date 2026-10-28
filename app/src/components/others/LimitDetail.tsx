import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { cn } from "@/libs/utils/cn";
import type { Limit } from "@/types/limit.type";
import type { MessageDetailRes } from "@/types/message.type";

interface LimitDetailProps {
  index: number;
  detail: MessageDetailRes;
  limits?: Limit[];
  isStatistic: boolean;
}

export default function LimitDetail({
  index,
  detail,
  limits,
  isStatistic,
}: LimitDetailProps) {
  const limit = !isStatistic
    ? 0
    : (limits?.find(
        (item) =>
          item.bet_type === detail.bet_type &&
          item.province_name.toString() === detail.province.toString() &&
          item.syntax === detail.syntax,
      )?.value ?? 0);

  const layoffValue =
    limit < detail.score && limit !== 0 ? detail.score - limit : 0;

  return (
    <Flex
      className={cn(
        "msg-detail even:bg-surface-1 text-sm",
        layoffValue > 0 && "bg-red-100/50!",
      )}
    >
      <Text as="span" className="w-20">
        {index + 1}
      </Text>
      <Text as="span">{detail.province}</Text>
      <Text as="span">{detail.number}</Text>
      <Text as="span">{detail.syntax}</Text>
      <Text as="span" className="text-blue-600 font-medium">
        {detail.score}
      </Text>
      {isStatistic && (
        <Text as="span" className="text-red-600 font-medium">
          {layoffValue}
        </Text>
      )}
      <Text as="span" className="text-emerald-600 font-medium">
        {detail.score}
      </Text>
    </Flex>
  );
}
