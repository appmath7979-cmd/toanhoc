import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/typography/Heading";
import { withFieldGroup } from "@/context/form.context";
import { defaultBasicInfo, guestRadio } from "@/data/customer-form.data";

const BasicSchema = withFieldGroup({
	defaultValues: {
		...defaultBasicInfo,
	},
	render: ({ group }) => (
		<Card>
			<Heading as="h2">Thông tin cơ bản</Heading>
			<group.AppField name="full_name">
				{(field) => (
					<field.TextField
						label="Họ và tên"
						placeholder="Nguyễn Văn A"
						id={field.name}
					/>
				)}
			</group.AppField>
			<group.AppField name="phone_number">
				{(field) => (
					<field.TextField
						label="Số điện thoại"
						placeholder="0123456789"
						type="tel"
						id={field.name}
					/>
				)}
			</group.AppField>
			<group.AppField name="is_guest">
				{(field) => (
					<field.RadioField
						defaultValue="false"
						values={guestRadio}
						variant="box"
					/>
				)}
			</group.AppField>
		</Card>
	),
});

export default BasicSchema;
