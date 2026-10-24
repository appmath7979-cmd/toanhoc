import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";
import Box from "@/components/ui/layouts/Box";
import type { MessageDetailRes } from "@/types/message.type";
import LimitDetail from "../others/LimitDetail";
import TitleLimitDetail from "../others/TitleLimitDetail";

interface CustomerLimitProps {
  id: string;
  allDetails: MessageDetailRes[];
}

export default function CustomerLimit({ id, allDetails }: CustomerLimitProps) {
  return (
    <Box className="mt-4">
      <Button variant="outline" setChild>
        <Link to={`/customers/limit/${id}`}>
          <SettingsIcon />
          Cài đặt
        </Link>
      </Button>
      <Box>
        <TitleLimitDetail />
        <ul>
          {allDetails.map((d, i) => (
            <LimitDetail key={d.id} index={i} detail={d} />
          ))}
        </ul>
      </Box>
    </Box>
  );
}
