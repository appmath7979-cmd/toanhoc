import { useAppStore } from "@lavaz/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RegionDropdown from "@/components/system/RegionDropdown";
import { Button } from "@/components/ui/Button";
import Editor from "@/components/ui/editor/Editor";
import Label from "@/components/ui/form/Label";
import Box from "@/components/ui/layouts/Box";
import Container from "@/components/ui/layouts/Container";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { schedule } from "@/data/schedule.data";
import { useGetCustomerById } from "@/hooks/query/use-customer-query";
import { useCreateMessage } from "@/hooks/query/use-message-query";
import { useGetSettingByCustomerId } from "@/hooks/query/use-setting-query";
import { parseMessageToDetails } from "@/libs/helper/message-parser";
import { store } from "@/store/store";
import type { Province } from "@/types/address.type";
import type { CreateMessage, MessageDetail } from "@/types/message.type";

export default function Message() {
	const { id } = useParams();
	// const { data, error } = useGetSettingByCustomerId(id ?? "");
	const { mutate, isSuccess, isPending } = useCreateMessage();
	const [region] = useAppStore(store.region, (s) => s.value);
	const [msgDetails, setMsgDetails] = useState<MessageDetail[]>([]);
	const [msgStr, setMsgStr] = useState<string>("");
	const [day] = useState(() => new Date().getDay());
	const [canSend, setCanSend] = useState<boolean>(false);
	const [canCheck, setCanCheck] = useState<boolean>(false);
	const navigate = useNavigate();
	const provinces = schedule[day][region ?? "mb"];

	const handleGetMsgString = useCallback((msg: string) => {
		setMsgStr(msg);
		setCanCheck(false);
	}, []);

	useEffect(() => {
		if (!msgStr) {
			setCanCheck(false);
			setCanSend(false);
		} else setCanCheck(true);
	}, [msgStr]);

	const handnleSend = async () => {
		if (!id) return;

		const data: CreateMessage = {
			content: msgStr,
			customer_id: id,
			is_send: false,
			message_details: msgDetails,
			region: region ?? "mb",
			at: "10-12-2026",
		};

		mutate(data);
	};

	const handleConvertMsgToDetails = () => {
		const newDetails = parseMessageToDetails(msgStr, provinces, region);
		setMsgDetails(newDetails);
		setCanSend(true);
		setCanCheck(false);
	};

	if (isSuccess) navigate(`/customers/${id}`);
	//
	//   if (error || !data?.success) {
	//     toast.error(data?.message ?? error?.message);
	//     navigate("customers");
	//   }

	return (
		<Container>
			<RegionDropdown />
			<Flex>
				<Button disabled>Kiểm tra tin</Button>
				<Button
					variant={msgStr && canCheck ? "primary" : "outline"}
					disabled={!msgStr || !canCheck || isPending}
					onClick={handleConvertMsgToDetails}
				>
					Xác nhận tin nhắn
				</Button>
				<Button
					variant={!canSend ? "outline" : "primary"}
					disabled={!canSend || isPending}
					onClick={handnleSend}
				>
					Gửi tin
				</Button>
			</Flex>
			<Flex justify="center" className="gap-2">
				{provinces.map((p) => (
					<Text
						key={`${p.province}-${region}`}
						className="border rounded-md border-border px-2 py-1 inline-flex items-center gap-2"
					>
						<Text as="span">{p.label}</Text>
						<Text as="span">{p.province}</Text>
					</Text>
				))}
			</Flex>
			<Flex justify="start" className="items-start" direction="vertical">
				<Label htmlFor="message-input">Nhập tin nhắn</Label>
				<Editor
					id="message-input"
					provinces={provinces.map((item) => item.province as Province)}
					isNorthern={region === undefined || region === "mb"}
					onMessageChange={handleGetMsgString}
				/>
			</Flex>

			<Box>
				<Text className="font-medium">Kiểm tra thông tin tin nhắn</Text>
				<Box>
					<Text className="font-medium">Tổng số tin: {msgDetails.length}</Text>
					<Box className="space-x-2 space-y-1">
						{msgDetails.map((item, i) => {
							const key = `${item.province}-${item.number}-${item.syntax}-${item.score}-${i}`;
							return (
								<Flex
									key={key}
									display="inline-flex"
									className="items-baseline-last gap-1.5 border border-border rounded-md shadow-md px-2 py-1"
								>
									<Text as="span">{item.province}</Text>
									<Text as="span">{item.number}</Text>
									<Text as="span">{item.syntax}</Text>
									<Text as="span">{item.score}</Text>
								</Flex>
							);
						})}
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
