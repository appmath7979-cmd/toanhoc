import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";

export default function TitleLimitDetail({
  isStatistic,
}: {
  isStatistic: boolean;
}) {
  return (
    <Flex className="msg-detail *:font-medium bg-surface-1 text-sm">
      <Text as="span" className="w-20">
        STT
      </Text>
      <Text as="span">Đài</Text>
      <Text as="span">Số/Cặp đánh</Text>
      <Text as="span">Cú pháp</Text>
      <Text as="span">Điểm</Text>
      {isStatistic ? (
        <>
          <Text as="span">Dư</Text>
          <Text as="span">Tổng</Text>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}
