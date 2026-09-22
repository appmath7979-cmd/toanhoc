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
import { formState } from "@/libs/utils/form-info";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CustomerForm({
	data,
	onReset,
}: {
	data: CopyCustomerState;
	onReset: () => void;
}) {
	const { data: dt, isCopy, isEdit, customerId } = data;
	const navigate = useNavigate();

	const {
		mutateAsync: createMutate,
		isSuccess: createSuccess,
		reset: resetCreate,
	} = useCreateCustomer();
	const {
		mutateAsync: updateMutate,
		isSuccess: updateSuccess,
		reset: resetUpdate,
	} = useUpdateCustomerWithSetting();
	const form = useAppForm({
		...createCustomerFormOpts(isCopy || isEdit ? dt : undefined),
		onSubmit: async ({ value }) => {
			try {
				if (isEdit && customerId) {
					const res = await updateMutate({ customerId, req: dt });
					formState(res.success, "Cập nhật khách hàng thành công!");

					if (res.success) onReset()

					return;
				}

				const res = await createMutate(value);
				formState(res.success, "Tạo khách hàng thành công!");

				if (res.success) onReset()
			} catch (error) {
				let msg: string = "";

				if (axios.isAxiosError(error))
					msg = error.response?.data?.message || error.message;

				if (error instanceof Error) msg = error.message;

				formState(false, msg);
			}
		},
	});

	useEffect(() => {
		if (createSuccess) {
			navigate("/customer");
			resetCreate();
		}
		if (updateSuccess) {
			navigate("/customer");
			resetUpdate();
		}
	}, [createSuccess, updateSuccess, navigate, resetCreate, resetUpdate]);

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
