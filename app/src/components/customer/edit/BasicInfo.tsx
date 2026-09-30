import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { withFieldGroup } from "@/context/form.context";
import { defaultBasicInfo } from "@/data/customer-form.data";

const BasicInfo = withFieldGroup({
	defaultValues: { ...defaultBasicInfo },
	render: ({ group }) => {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Thông tin cơ bản</CardTitle>
				</CardHeader>
				<CardBody>
					<group.AppField name="full_name">
						{(field) => (
							<field.TextField
								label="Tên khách hàng"
								placeholder="Nguyễn Văn A"
							/>
						)}
					</group.AppField>
					<group.AppField name="is_guest">
						{(field) => (
							<field.RadioField
								variant="box"
								defaultValue="true"
								values={[
									{
										id: "radio-guest--true",
										label: "Khách",
										value: "true",
										description: "Khách hàng là người gửi tin cho bạn.",
									},
									{
										id: "radio-guest--false",
										label: "Chủ",
										value: "false",
										description: "Khách hàng là người nhận tin của bạn.",
									},
								]}
							/>
						)}
					</group.AppField>
				</CardBody>
			</Card>
		);
	},
});

export default BasicInfo;
