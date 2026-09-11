import { Field } from "../components/core/field/Field";
import { Input } from "../components/core/field/Input";
import { Label } from "../components/core/field/Label";

export function Customer() {
	return <div>
		<Field direction="horizontal">
			<Label>Tìm kiếm khách hàng</Label>
			<Input />
		</Field>
	</div>;
}
