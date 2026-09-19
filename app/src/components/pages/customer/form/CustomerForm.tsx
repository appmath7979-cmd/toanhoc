import { useAppStore } from "@lavaz/store";
import { store } from "@/store/store";
import { useCreateCustomer } from "@/hooks/query/useCustomerQuery";
import { useAppForm } from "@/hooks/use-form";
import { createCustomerFormOpts } from "@/libs/helper/create-customer-form";
import CustomerInfo from "./CustomerInfo";
import CustomerSetting from "./CustomerSetting";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { Button } from "@/components/core/button/Button";

export default function CustomerForm({ id }: { id?: string }) {
	const [data] = useAppStore(store.copyCustomer, (s) => s);

	const { mutateAsync } = useCreateCustomer();

	const form = useAppForm({
		...createCustomerFormOpts(data),
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
		},
	});

	console.log(id);

	return (
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
						loading={isSubmitting}
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
	);
}
