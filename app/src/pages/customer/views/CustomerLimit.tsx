import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import Box from "@/components/ui/layouts/Box";

interface CustomerLimitProps {
  id: string;
}

export default function CustomerLimit({ id }: CustomerLimitProps) {
  return (
    <Box className="mt-4">
      <Button variant="outline" setChild>
        <Link to={`/customers/limit/${id}`}>
          <SettingsIcon />
          Cài đặt
        </Link>
      </Button>
    </Box>
  );
}
