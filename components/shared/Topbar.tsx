"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ArrowRight, EditIcon, LockIcon, MenuIcon } from "lucide-react";

import { ActiveElement } from "@/types";
import { Badge } from "@/components/ui/badge";
import ActiveUsers from "@/components/liveblocks/users/ActiveUsers";
import EditTitleField from "../forms/EditTitleField";

interface TopbarProps {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
}

const Topbar = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("Untitled Design");

  const onClickEditTitle = () => setIsEditingTitle(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleTitleSubmit = () => {
    console.log("titleValue :>> ", titleValue);
    setIsEditingTitle(false);
  };

  return (
    <nav className="flex select-none items-center justify-between gap-4 text-white rounded-xl">
      <section className="flex gap-2">
        <div className="bg-primary-black rounded-xl px-6 py-4">
          <MenuIcon size={24} />
        </div>

        <div className="bg-primary-black rounded-xl px-4">
          <Image src="/logo.png" alt="logo" width={144} height={48} />
        </div>
      </section>

      <section className="flex group items-center gap-4 bg-primary-black rounded-xl px-6 py-4">
        {isEditingTitle ? <EditTitleField value={titleValue} handleInputChange={handleInputChange} /> : <div>{titleValue}</div>}

        {isEditingTitle ? (
          <ArrowRight onClick={handleTitleSubmit} size={16} />
        ) : (
          <EditIcon onClick={onClickEditTitle} size={16} className="hidden group-hover:block" />
        )}
        {/* <Badge className="bg-primary-grey-100 text-gray-400 hover:bg-none">
          <LockIcon size={12} className="text-gray-500" />
          &nbsp; Read Only
        </Badge> */}
      </section>

      <section className="bg-primary-black rounded-xl px-4 py-3">
        <ActiveUsers />
      </section>
    </nav>
  );
};

export default Topbar;
