import { useState } from "react";

import { ActiveElement } from "@/types";
import { navElements } from "@/constants";
import { cn } from "@/lib/utils";
import ShapesMenu from "@/components/menus/ShapesMenu";
import NewComment from "@/components/liveblocks/comments/NewComment";

interface LeftSidebarProps {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
}

const LeftSidebar = ({ activeElement, handleActiveElement, handleImageUpload, imageInputRef }: LeftSidebarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (value: string | ActiveElement[]) =>
    (activeElement && activeElement.value === value) || (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

  return (
    <aside className="flex flex-col gap-2 justify-center border-primary-grey-200 bg-primary-black text-white rounded-xl sticky left-0 max-sm:hidden h-full select-none p-2">
      {navElements.map((element: ActiveElement) => (
        <div
          key={element.name}
          className={cn(
            "group flex justify-center items-center rounded-md cursor-pointer p-4",
            isActive(element.value) ? "bg-primary-purple" : "hover:bg-primary-grey-200",
            Array.isArray(element.value) && menuOpen && "bg-primary-grey-200"
          )}
          onClick={() => (Array.isArray(element.value) ? setMenuOpen(!menuOpen) : handleActiveElement(element))}
        >
          {Array.isArray(element.value) ? (
            <ShapesMenu
              element={element}
              activeElement={activeElement}
              handleActiveElement={handleActiveElement}
              imageInputRef={imageInputRef}
              handleImageUpload={handleImageUpload}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          ) : element.value === "comments" ? (
            <NewComment>
              <element.icon size={24} />
            </NewComment>
          ) : (
            <element.icon size={24} />
          )}
        </div>
      ))}
    </aside>
  );
};

export default LeftSidebar;
