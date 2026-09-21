import { z } from "zod";

const betPairValueSchema = z.object({
	mb: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0"),
	mn: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0"),
	mt: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0"),
});

const betPairSchema = z.object({
	c: betPairValueSchema,
	percent: z.boolean(),
	t: betPairValueSchema,
	type: z.enum(["b2", "dd2", "da", "dax", "b3", "dd3", "b4"]),
});

const SettingSchema = z.object({
	dax_t: z.enum(["ONE", "HALF", "MANY"]),
	xienMB: z.boolean(),
	bets: z.array(betPairSchema),
});

const CustomerSchema = z.object({
	full_name: z
		.string()
		.min(2, { message: "Tên khách hàng không được để trống!" })
		.max(100, { message: "Tên chỉ được chứa tối đa 100 ký tự!" }),
	phone_number: z
		.string()
		.regex(
			/^(\+84|84|0)([3|5|7|8|9])[0-9]{8}$/,
			"Số điện thoại không đúng định dạng",
		),
	guest: z.boolean(),
	setting: SettingSchema,
});

type CreateCustomer = z.infer<typeof CustomerSchema>;
type CreateSetting = z.infer<typeof SettingSchema>;

export {
	CustomerSchema,
	SettingSchema,
	type CreateCustomer,
	type CreateSetting,
};
