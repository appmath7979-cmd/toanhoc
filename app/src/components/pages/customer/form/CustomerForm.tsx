import {
	useCreateCustomer,
	useUpdateCustomerWithSetting,
} from "@/hooks/query/useCustomerQuery";
import { useAppForm } from "@/hooks/use-form";
import { createCustomerFormOpts } from "@/libs/helper/create-customer-form";
import CustomerInfo from "./CustomerInfo";
import CustomerSetting from "./CustomerSetting";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { Button } from "@/components/core/button/Button";
import { CopyCustomerState } from "@/store/boxes/customer/copy-customer.box";

export default function CustomerForm({ data }: { data: CopyCustomerState }) {
	const { data: dt, isCopy, isEdit, customerId } = data;

	const { mutateAsync: createMutate } = useCreateCustomer();
	const { mutateAsync: updateMutate } = useUpdateCustomerWithSetting();
	const form = useAppForm({
		...createCustomerFormOpts(isCopy || isEdit ? dt : undefined),
		onSubmit: async ({ value }) => {
			if (isCopy || (!isCopy && !isEdit)) await createMutate(value);
			if (isEdit && customerId) await updateMutate({ customerId, req: dt });
		},
	});

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
