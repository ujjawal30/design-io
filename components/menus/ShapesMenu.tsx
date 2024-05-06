import { ActiveElement } from "@/types";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ShapesMenuProps {
  element: ActiveElement;
  activeElement: ActiveElement;
  handleActiveElement?: any;
  handleImageUpload?: any;
  imageInputRef?: any;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShapesMenu = ({ element, activeElement, handleActiveElement, handleImageUpload, imageInputRef, menuOpen, setMenuOpen }: ShapesMenuProps) => {
  if (typeof element.value === "string") return null;

  const DropdownIcon = element.value.some((elem) => elem?.value === activeElement.value) ? activeElement.icon : element.icon;

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger className="no-ring">
          <DropdownIcon size={24} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="ml-8 border-none bg-primary-black p-2 text-white rounded-xl" side="left">
          {element.value.map((elem) => (
            <DropdownMenuItem
              key={elem?.name}
              onClick={() => {
                handleActiveElement(elem);
              }}
              className={cn(
                "flex h-fit group items-center gap-4 rounded-lg p-4 focus:border-none",
                activeElement.value === elem?.value ? "!bg-primary-purple" : "focus:bg-primary-grey-200"
              )}
            >
              <elem.icon size={20} />
              <p className="text-sm text-white">{elem?.name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input type="file" className="hidden" ref={imageInputRef} accept="image/*" onChange={handleImageUpload} />
    </>
  );
};

export default ShapesMenu;
