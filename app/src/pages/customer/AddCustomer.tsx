import { Button } from "@/components/core/button/Button";
import CustomerInfo from "@/components/pages/customer/create/CustomerInfo";
import CustomerSetting from "@/components/pages/customer/create/CustomerSetting";
import { useCreateCustomer } from "@/hooks/query/useCustomerQuery";
import { useAppForm } from "@/hooks/use-form";
import { createCustomerFormOpts } from "@/libs/helper/create-customer-form";
import { Loader2Icon, SaveIcon } from "lucide-react";

export default function AddCustomer() {
	const { mutateAsync } = useCreateCustomer();
	const form = useAppForm({
		...createCustomerFormOpts,
		onSubmit: async ({ value }) => {
			console.log(value);
			await mutateAsync(value);
		},
	});

	return (
		<div className="space-y-8 pb-20">
			<h2 className="md:text-xl font-semibold uppercase text-center">
				Tạo khách hàng mới
			</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-6"
			>
				<CustomerInfo form={form} />
				<CustomerSetting form={form} />
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							size="xl"
							type="submit"
							className="w-full justify-center"
							disabled={!canSubmit || isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2Icon />
									<span>Đang xử lý...</span>
								</>
							) : (
								<>
									<SaveIcon />
									<span>Lưu thông tin</span>
								</>
							)}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
