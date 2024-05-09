import React from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "../ui/input";

interface SearchInputProps {
  value: string;
  handleInputeChange: (value: string) => void;
  placeholder: string;
}

const SearchInput = ({ value, handleInputeChange, placeholder }: SearchInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputeChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 text-white bg-primary-grey-200 rounded-lg px-4">
      <SearchIcon size={20} className="text-gray-500" />
      <Input type="text" className="bg-transparent border-none no-ring" value={value} placeholder={placeholder} onChange={handleOnChange} />
      {value.length > 0 && <XIcon size={20} className="text-gray-500 hover:text-gray-300 cursor-pointer" onClick={() => handleInputeChange("")} />}
    </div>
  );
};

export default SearchInput;
