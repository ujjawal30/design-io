import { memo } from "react";
import Image from "next/image";

import { ActiveElement } from "@/types";
import ActiveUsers from "@/components/liveblocks/users/ActiveUsers";

interface NavbarProps {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
}

const Navbar = ({ activeElement }: NavbarProps) => {
  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black text-white px-8 py-4">
      <Image src="/logo.png" alt="logo" width={192} height={64} />
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
