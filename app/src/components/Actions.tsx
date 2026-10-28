import { CopyIcon, SquarePenIcon, TrashIcon } from "lucide-react";
import DeleteAlert from "@/components/system/dialog/DeleteAlert";
import { Button } from "@/components/ui/button/Button";
import { AlertTrigger } from "@/components/ui/dialog/Alert";
import Flex from "@/components/ui/layouts/Flex";
import Tooltip from "@/components/ui/Tooltip";
import { useDeleteMessage } from "@/hooks/query/use-message-query";
import { copyToClipboard } from "@/libs/helper/copy-to-clipboard";

interface ActionsProps {
  msgContent: string;
  id: string;
}

export default function Actions({ msgContent, id }: ActionsProps) {
  const { mutate } = useDeleteMessage();

  return (
    <Flex className="shrink-0">
      <Tooltip content="Sao chép">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(msgContent)}
        >
          <CopyIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Sửa tin">
        <Button size="sm" variant="ghost">
          <SquarePenIcon />
        </Button>
      </Tooltip>
      <DeleteAlert
        title="Xóa tin nhắn"
        description="Bạn muốn xóa tin nhắn này?"
        onClick={() => mutate(id)}
      >
        <Tooltip content="Xóa tin">
          <AlertTrigger asChild>
            <Button size="sm" variant="ghost" danger>
              <TrashIcon />
            </Button>
          </AlertTrigger>
        </Tooltip>
      </DeleteAlert>
    </Flex>
  );
}
