import { ActiveElement } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShapesMenuProps {
  element: ActiveElement;
  activeElement: ActiveElement;
  handleActiveElement?: any;
  handleImageUpload?: any;
  imageInputRef?: any;
}

const ShapesMenu = ({
  element,
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: ShapesMenuProps) => {
  if (typeof element.value === "string") return null;

  const DropdownIcon = element.value.some(
    (elem) => elem?.value === activeElement.value
  )
    ? activeElement.icon
    : element.icon;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="no-ring">
          <div onClick={() => handleActiveElement(element)}>
            <DropdownIcon size={20} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-6 flex flex-col gap-y-1 border-none bg-primary-black py-2 px-1 text-white">
          {element.value.map((elem) => (
            <div
              key={elem?.name}
              onClick={() => {
                handleActiveElement(elem);
              }}
              className={`flex h-fit group items-center gap-4 rounded-none px-4 py-3 focus:border-none ${
                activeElement.value === elem?.value
                  ? "bg-primary-purple"
                  : "hover:bg-primary-grey-200"
              }`}
            >
              <elem.icon size={20} />
              <p className="text-sm text-white">{elem?.name}</p>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default ShapesMenu;
