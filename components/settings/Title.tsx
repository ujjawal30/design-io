import { useState } from "react";
import { Input } from "../ui/input";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface TitleProps {
  title: string;
  canEdit: boolean;
}

const Title = ({ title, canEdit }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [canSave, setCanSave] = useState(false);

  const handleEnableEdit = () => setIsEditing(true);

  const handleDisableEdit = () => {
    setTitleValue(title);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const newTitle = event.target.value;

    setTitleValue(newTitle);
    setCanSave(newTitle !== title && newTitle.length >= 3);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="flex justify-center items-center gap-2">
      <Input
        type="text"
        id="title"
        placeholder="Add a title..."
        value={titleValue}
        className="title-input h-6 !w-fit"
        onChange={handleInputChange}
        autoFocus
      />
      <Button variant="inputAction" onClick={handleDisableEdit}>
        <XIcon size={16} />
      </Button>
      <Button disabled={!canSave} variant="inputAction" onClick={handleSubmit}>
        <CheckIcon size={16} />
      </Button>
    </div>
  ) : (
    <div className="group flex justify-center items-center gap-2">
      <p>{title}</p>
      {canEdit && (
        <Button variant="inputAction" onClick={handleEnableEdit} className="hidden group-hover:block">
          <EditIcon size={16} />
        </Button>
      )}
    </div>
  );
};

export default Title;
