import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/core/Card";
import Field from "@/components/core/field/Field";
import Input from "@/components/core/field/Input";
import Label from "@/components/core/field/Label";
import { Radio, RadioItem } from "@/components/core/field/Radio";
import { withForm } from "@/hooks/use-form";
import { createCustomerFormOpts } from "@/libs/helper/create-customer-form";

const CustomerInfo = withForm({
	...createCustomerFormOpts,
	render: function Render({ form }) {
		return (
			<Card>
				<CardHeader>
					<CardTitle title="Thông tin cơ bản" />
					<CardDescription>Các thông tin cơ bản của khách hàng</CardDescription>
				</CardHeader>

				<CardBody>
					<form.Field name="full_name">
						{({ name, handleChange, handleBlur, state }) => (
							<Field>
								<Label htmlFor={name}>Họ tên khách hàng</Label>
								<Input
									id={name}
									type="text"
									value={state.value}
									placeholder="Nguyễn Văn A..."
									onChange={(e) => handleChange(e.target.value)}
									onBlur={handleBlur}
								/>
								{!state.meta.isValid && (
									<em
										role="alert"
										className="text-xs md:text-sm text-status-danger"
									>
										{state.meta.errors[0]?.message}
									</em>
								)}
							</Field>
						)}
					</form.Field>
					<form.Field name="phone_number">
						{({ name, handleChange, handleBlur, state }) => (
							<Field>
								<Label htmlFor={name}>Số điện thoại</Label>

								<Input
									id={name}
									type="tel"
									value={state.value}
									placeholder="Số điện thoại..."
									onChange={(e) => handleChange(e.target.value)}
									onBlur={handleBlur}
								/>
							</Field>
						)}
					</form.Field>
					<form.Field name="guest">
						{({ handleChange, state }) => (
							<Field>
								<Radio
									value={state.value ? "true" : "false"}
									defaultValue="true"
									onValueChange={(val) => handleChange(val === "true")}
								>
									<RadioItem
										className="radio-box"
										value="true"
										label="Khách"
										isBox
										description="Lựa chọn nếu khách hàng là người gửi tin cho bạn!"
									/>
									<RadioItem
										className="radio-box"
										value="false"
										label="Chủ"
										isBox
										description="Lựa chọn nếu khách hàng là người nhận tin của bạn!"
									/>
								</Radio>
							</Field>
						)}
					</form.Field>
				</CardBody>
			</Card>
		);
	},
});

export default CustomerInfo;
