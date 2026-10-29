import { SearchIcon } from "lucide-react";
import { type ComponentProps, memo, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import Input from "../ui/form/Input";

interface SearchFieldProps extends ComponentProps<"input"> {
  onValueChange: (value: string) => void;
  value: string;
}

const SearchField = memo(
  ({ placeholder, value, onValueChange, ...props }: SearchFieldProps) => {
    const [search, setSearch] = useState<string>(value);
    const debounced = useDebounce({ value: search });

    useEffect(() => {
      if (debounced === search) return;
      onValueChange(debounced);
    }, [debounced, search, onValueChange]);

    return (
      <div className="search">
        <SearchIcon className="" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          placeholder={placeholder ?? "Search..."}
          {...props}
        />
      </div>
    );
  },
);

export default SearchField;
