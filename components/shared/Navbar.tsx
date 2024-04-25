import { memo } from "react";
import Image from "next/image";

import { ActiveElement } from "@/types";
import ActiveUsers from "@/components/liveblocks/users/ActiveUsers";
import { navElements } from "@/constants";
import ShapesMenu from "./ShapesMenu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
}

const Navbar = ({
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: NavbarProps) => {
  const isActive = (value: string | ActiveElement[]) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black text-white px-4 py-2">
      <Image src="/logo.png" alt="logo" width={144} height={48} />

      <div className="flex flex-row">
        {navElements.map((element: ActiveElement) => (
          <div
            key={element.name}
            className={cn(
              "group flex justify-center items-center p-4",
              isActive(element.value)
                ? "bg-primary-purple"
                : "hover:bg-primary-grey-200"
            )}
            onClick={() =>
              !Array.isArray(element.value) && handleActiveElement(element)
            }
          >
            {Array.isArray(element.value) ? (
              <ShapesMenu
                element={element}
                activeElement={activeElement}
                handleActiveElement={handleActiveElement}
                imageInputRef={imageInputRef}
                handleImageUpload={handleImageUpload}
              />
            ) : element.value === "comments" ? (
              <element.icon size={20} />
            ) : (
              <element.icon size={20} />
            )}
          </div>
        ))}
      </div>

      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
