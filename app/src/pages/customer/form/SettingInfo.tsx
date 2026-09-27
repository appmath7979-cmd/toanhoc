import { Card } from "@/components/ui/Card";
import Box from "@/components/ui/layouts/Box";
import Grid from "@/components/ui/layouts/Grid";
import Heading from "@/components/ui/typography/Heading";
import { withFieldGroup } from "@/context/form.context";
import {
	daxTRadio,
	defaultSettingInfo,
	xienMbRadio,
} from "@/data/customer-form.data";
import { useSelector } from "@tanstack/react-form";

const SettingForm = withFieldGroup({
	defaultValues: {
		setting: {
			...defaultSettingInfo,
		},
	},
	render: ({ group }) => {
		const bets = useSelector(group.store, (state) => state.values.setting);

		return (
			<Card>
				<Heading as="h3"> Cấu hình</Heading>
				<Box mode="container" className="space-y-2">
					<Heading as="h4">Xiên Miền Bắc</Heading>
					<group.AppField name="setting.dax_t">
						{(field) => (
							<field.RadioField
								defaultValue="false"
								values={xienMbRadio}
								variant="box"
							/>
						)}
					</group.AppField>
				</Box>
				<group.Field name="setting.bets" mode="array">
					{(field) =>
						field.state.value.map((item, i) => (
							<Box key={item.bet_type} mode="container" className="space-y-4">
								<Heading as="h4">{bets.bets[i].bet_type}</Heading>
								<Box mode="container" className="space-y-3">
									<Box
										mode="container"
										className="space-y-2 border border-border p-2 rounded-md"
									>
										<Heading as="h5">Cò</Heading>
										<Grid span={3} className="md:grid-cols-3!">
											<group.AppField name={`setting.bets[${i}].c.mb`}>
												{(subField) => <subField.TextField label="Miền Bắc" />}
											</group.AppField>
											<group.AppField name={`setting.bets[${i}].c.mt`}>
												{(subField) => (
													<subField.TextField label="Miền Trung" />
												)}
											</group.AppField>
											<group.AppField name={`setting.bets[${i}].c.mn`}>
												{(subField) => <subField.TextField label="Miền Nam" />}
											</group.AppField>
										</Grid>
									</Box>
									<Box
										mode="container"
										className="space-y-2 border border-border p-2 rounded-md"
									>
										<Heading as="h5">Trúng</Heading>
										<Grid span={3} className="md:grid-cols-3!">
											<group.AppField name={`setting.bets[${i}].t.mb`}>
												{(subField) => <subField.TextField label="Miền Bắc" />}
											</group.AppField>
											<group.AppField name={`setting.bets[${i}].t.mt`}>
												{(subField) => (
													<subField.TextField label="Miền Trung" />
												)}
											</group.AppField>
											<group.AppField name={`setting.bets[${i}].t.mn`}>
												{(subField) => <subField.TextField label="Miền Nam" />}
											</group.AppField>
										</Grid>
									</Box>
								</Box>
							</Box>
						))
					}
				</group.Field>
				<Box mode="container" className="space-y-2">
					<Heading as="h4">Tính trúng Đá Xiên</Heading>
					<group.AppField name="setting.dax_t">
						{(field) => (
							<field.RadioField
								defaultValue="HALF"
								values={daxTRadio}
								direction="horizontal"
							/>
						)}
					</group.AppField>
				</Box>
			</Card>
		);
	},
});

export default SettingForm;
