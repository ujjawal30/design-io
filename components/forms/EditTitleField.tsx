import { Input } from "@/components/ui/input";

interface EditTitleFieldProps {
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditTitleField = ({ value, handleInputChange }: EditTitleFieldProps) => {
  return (
    <div className="py-0">
      <Input type="text" id="title" placeholder="100" value={value} className="title-input h-6 w-fit" onChange={handleInputChange} autoFocus />
    </div>
  );
};

export default EditTitleField;
