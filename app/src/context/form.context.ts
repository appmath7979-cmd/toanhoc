import NumberField from "@/components/ui/form/tanstack/NumberField";
import RadioField from "@/components/ui/form/tanstack/RadioField";
import SubscribeButton from "@/components/ui/form/tanstack/SubscribeButton";
import TextField from "@/components/ui/form/tanstack/TextField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		NumberField,
		RadioField,
	},
	formComponents: {
		SubscribeButton,
	},
});

export {
	fieldContext,
	formContext,
	useFieldContext,
	useAppForm,
	withFieldGroup,
	useFormContext,
};
