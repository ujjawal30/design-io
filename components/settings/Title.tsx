import { useState } from "react";
import { usePathname } from "next/navigation";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";

import { updateDesignMetadata } from "@/lib/actions/design.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleProps {
  designId: string;
  title: string;
  isCreator: boolean;
}

const Title = ({ designId, title, isCreator }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [canSave, setCanSave] = useState(false);

  const pathname = usePathname();

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

  const handleSubmit = async () => {
    await updateDesignMetadata({ designId, title: titleValue, path: pathname });
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
      {isCreator && (
        <Button variant="inputAction" onClick={handleEnableEdit} className="hidden group-hover:block">
          <EditIcon size={16} />
        </Button>
      )}
    </div>
  );
};

export default Title;
