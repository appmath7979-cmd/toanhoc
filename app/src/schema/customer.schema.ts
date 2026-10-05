import { z } from "zod";

const BetPairSchema = z.object({
	bet_type: z.enum(["b2", "dd2", "da", "dax", "b3", "dd3", "b4"]),
	c: z.object({
		mb: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
		mt: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
		mn: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
	}),
	t: z.object({
		mb: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
		mt: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
		mn: z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0!"),
	}),
	percent: z.boolean(),
});

const SettingSchema = z.object({
	dax_t: z.enum(["ONE", "HALF", "MANY"]),
	xien_mb: z.boolean(),
	bets: z.array(BetPairSchema),
});

const CustomerSchema = z.object({
	full_name: z
		.string()
		.min(2, "Họ tên phải có ít nhất 2 ký tự!")
		.max(100, "Họ tên chỉ chứa tối đa 100 ký tự!"),
	is_guest: z.boolean(),
	setting: SettingSchema,
});

type CreateCustomer = z.infer<typeof CustomerSchema>;
type CustomerBasicInfo = Omit<CreateCustomer, "setting">;
type CustomerSettingInfo = Pick<CreateCustomer, "setting">;
type BetPair = z.infer<typeof BetPairSchema>;

export {
	type CreateCustomer,
	CustomerSchema,
	type CustomerBasicInfo,
	type CustomerSettingInfo,
};
