import RegionDropdown from "@/components/system/RegionDropdown";
import { Button } from "@/components/ui/Button";
import Editor from "@/components/ui/editor/Editor";
import Label from "@/components/ui/form/Label";
import Container from "@/components/ui/layouts/Container";
import Flex from "@/components/ui/layouts/Flex";
import Text from "@/components/ui/typography/Text";
import { schedule } from "@/data/schedule.data";
import { store } from "@/store/store";
import { Province } from "@/types/address.type";
import { useAppStore } from "@lavaz/store";
import { useState } from "react";

export default function Message() {
	const [region] = useAppStore(store.region, (s) => s.value);
	const [day] = useState(() => new Date().getDay());
	const provinces = schedule[day - 1][region ?? "mb"];

	return (
		<Container>
			<RegionDropdown />
			<Flex>
				<Button disabled>Kiểm tra tin</Button>
				<Button disabled>Xác nhận tin nhắn</Button>
				<Button disabled>Gửi tin</Button>
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
				/>
			</Flex>
		</Container>
	);
}
