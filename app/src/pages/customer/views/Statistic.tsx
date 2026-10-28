import Box from "@/components/ui/layouts/Box";
import type { Limit } from "@/types/limit.type";
import type { MessageDetailRes } from "@/types/message.type";
import LimitDetail from "../../../components/others/LimitDetail";
import TitleLimitDetail from "../../../components/others/TitleLimitDetail";

interface CustomerLimitProps {
  allDetails: MessageDetailRes[];
  limits: Limit[];
}

export default function Statistic({ allDetails, limits }: CustomerLimitProps) {
  return (
    <Box className="mt-4">
      <Box>
        <TitleLimitDetail isStatistic />
        <ul>
          {allDetails.map((d, i) => (
            <LimitDetail
              key={d.id}
              index={i}
              detail={d}
              limits={limits}
              isStatistic
            />
          ))}
        </ul>
      </Box>
    </Box>
  );
}
