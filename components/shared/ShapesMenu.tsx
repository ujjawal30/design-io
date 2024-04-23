import { ActiveElement } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

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

  const isDropdownElem = element.value.some(
    (elem) => elem?.value === activeElement.value
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="no-ring">
          <Button onClick={() => handleActiveElement(element)}>
            {isDropdownElem ? (
              <activeElement.icon size={20} className="invert" />
            ) : (
              <element.icon size={20} />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-4 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
          {element.value.map((elem) => (
            <Button
              key={elem?.name}
              onClick={() => {
                handleActiveElement(elem);
              }}
              className={`flex h-fit justify-between gap-10 rounded-none px-4 py-2 focus:border-none ${
                activeElement.value === elem?.value
                  ? "bg-primary-purple"
                  : "hover:bg-primary-grey-200"
              }`}
            >
              <div className="group flex items-center gap-2">
                <elem.icon
                  size={20}
                  className={
                    activeElement.value === elem?.value ? "invert" : ""
                  }
                />
                <p
                  className={`text-sm  ${
                    activeElement.value === elem?.value
                      ? "text-primary-black"
                      : "text-white"
                  }`}
                >
                  {elem?.name}
                </p>
              </div>
            </Button>
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
