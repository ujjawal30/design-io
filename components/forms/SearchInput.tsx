import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  handleInputeChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const SearchInput = ({ value, handleInputeChange, placeholder, className }: SearchInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputeChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 text-white bg-primary-grey-200 rounded-lg px-4 max-sm:hidden">
      <SearchIcon size={20} className="text-gray-500" />
      <Input
        type="text"
        className={cn("bg-transparent border-none no-ring", className)}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      {value.length > 0 && <XIcon size={20} className="text-gray-500 hover:text-gray-300 cursor-pointer" onClick={() => handleInputeChange("")} />}
    </div>
  );
};

export default SearchInput;
