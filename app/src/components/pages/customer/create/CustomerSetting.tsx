import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/core/Card";
import Input from "@/components/core/field/Input";
import Label from "@/components/core/field/Label";
import { Radio, RadioItem } from "@/components/core/field/Radio";
import Switch from "@/components/core/field/Switch";
import { withForm } from "@/hooks/use-form";
import { createCustomerFormOpts } from "@/libs/helper/create-customer-form";

const CustomerSetting = withForm({
	...createCustomerFormOpts,
	render: function Render({ form }) {
		return (
			<Card>
				<CardHeader>
					<CardTitle title="Thông tin thiết lập" />
					<CardDescription>
						Thiết lập các thông tin của khách hàng
					</CardDescription>
				</CardHeader>
				<CardBody>
					<form.Field name="setting.xienMB">
						{({ state, handleChange }) => (
							<Radio
								value={state.value ? "true" : "false"}
								defaultValue="false"
								onValueChange={(val) => handleChange(val === "true")}
							>
								<RadioItem
									value="true"
									label="Cho phép"
									description="Cho phép khách hàng đá thẳng cho miền Bắc. Điều này sẽ áp dụng cho tính đá xiên"
									isBox
								/>
								<RadioItem
									value="false"
									label="Không"
									description="Không cho phép khách hàng đá thẳng cho miền Bắc. Điều này sẽ không áp dụng cho tính đá xiên"
									isBox
								/>
							</Radio>
						)}
					</form.Field>
					<form.Field name="setting.bets">
						{(field) => (
							<div className="space-y-6">
								{field.state.value?.map((item, index) => (
									<div
										key={index}
										className="border rounded-xl p-5 bg-surface space-y-4 shadow-sm"
									>
										{/* Tiêu đề loại cược */}
										<div className="flex items-center justify-between border-b pb-3">
											<span className="font-bold text-base">
												Cú pháp:{" "}
												<span className="text-primary uppercase">
													{item.type}
												</span>
											</span>

											{/* Switch phần trăm */}
											<form.Field name={`setting.bets[${index}].percent`}>
												{(subField) => (
													<div className="flex items-center gap-2">
														<span className="text-xs">Tỉ lệ</span>
														<Switch
															checked={subField.state.value}
															onCheckedChange={subField.handleChange}
														/>
													</div>
												)}
											</form.Field>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{(["mb", "mn", "mt"] as const).map((region) => (
												<div
													key={region}
													className="bg-surface-accent p-3 rounded-lg border space-y-2"
												>
													<div className="text-xs font-bold uppercase tracking-wider">
														Miền {region.toUpperCase()}
													</div>

													{/* Input C của miền này */}
													<form.Field
														name={`setting.bets[${index}].c.${region}`}
													>
														{(subField) => (
															<div className="flex flex-col gap-1">
																<Label className="text-[11px]">Cò</Label>
																<Input
																	type="number"
																	value={subField.state.value}
																	onChange={(e) =>
																		subField.handleChange(
																			Number(e.target.value),
																		)
																	}
																	className="bg-surface"
																/>
															</div>
														)}
													</form.Field>

													{/* Input T của miền này */}
													<form.Field
														name={`setting.bets[${index}].t.${region}`}
													>
														{(subField) => (
															<div className="flex flex-col gap-1">
																<Label className="text-[11px] font-medium">
																	Trúng
																</Label>
																<Input
																	type="number"
																	value={subField.state.value}
																	onChange={(e) =>
																		subField.handleChange(
																			Number(e.target.value),
																		)
																	}
																	className="bg-surface"
																/>
															</div>
														)}
													</form.Field>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</form.Field>
					<form.Field name="setting.dax_t">
						{({ state, handleChange }) => (
							<div className="space-y-2">
								<p className="font-medium text-sm">Tính trúng đá xiên</p>
								<Radio
									value={state.value as "ONE" | "HALF" | "MANY"}
									defaultValue="HALF"
									onValueChange={(val) =>
										handleChange(val as "ONE" | "HALF" | "MANY")
									}
								>
									<RadioItem label="1 ky" value="ONE" />
									<RadioItem label="ky rưỡi" value="HALF" />
									<RadioItem label="nhiều ky" value="MANY" />
								</Radio>
							</div>
						)}
					</form.Field>
				</CardBody>
			</Card>
		);
	},
});

export default CustomerSetting;
