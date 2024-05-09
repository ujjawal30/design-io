"use client";

import { useState } from "react";
import Image from "next/image";
import { BellIcon, PlusIcon } from "lucide-react";

import Avatar from "@/components/liveblocks/users/Avatar";
import AccountMenu from "@/components/menus/AccountMenu";
import SearchInput from "@/components/forms/SearchInput";

interface NavbarProps {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
}

const Navbar = ({ user }: NavbarProps) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black text-white rounded-xl px-4 py-2">
      <div className="px-2">
        <Image src="/logo.png" alt="logo" width={144} height={48} />
      </div>

      <SearchInput value={searchKey} handleInputeChange={setSearchKey} placeholder="Search a design..." className="w-72" />

      <div className="flex items-center gap-4">
        <div className="bg-primary-grey-200 h-fit p-4 rounded-xl">
          <BellIcon size={20} className="text-gray-400" />
        </div>
        <AccountMenu id={user.id} info={{ name: user.name, avatar: user.photo }}>
          <div className="bg-primary-grey-200 rounded-xl p-2">
            <Avatar src={user.photo} alt={user.name} size={36} />
          </div>
        </AccountMenu>
      </div>
    </nav>
  );
};

export default Navbar;
