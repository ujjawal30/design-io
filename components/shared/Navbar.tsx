"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BellIcon, PlusIcon } from "lucide-react";

import Avatar from "@/components/liveblocks/users/Avatar";
import AccountMenu from "@/components/menus/AccountMenu";
import SearchInput from "@/components/forms/SearchInput";
import { Button } from "../ui/button";
import { editMetadataModal } from "@/hooks/useModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { onOpen } = editMetadataModal();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const queryString = searchParams.toString();

      const queryParams = searchKey ? formUrlQuery(queryString, "q", searchKey) : removeKeysFromQuery(queryString, ["q"]);

      router.push(`${pathname}${queryParams}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, searchKey]);

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black text-white rounded-xl px-4 py-2">
      <div className="px-2">
        <Image src="/logo.png" alt="logo" width={144} height={48} />
      </div>

      <SearchInput value={searchKey} handleInputeChange={setSearchKey} placeholder="Search a design..." className="w-72" />

      <div className="flex items-center gap-4 px-2">
        <Button className="bg-primary-purple" onClick={() => onOpen({} as DesignProps)}>
          <PlusIcon size={28} />
          <span className="ml-2 hidden md:inline-block">New Design</span>
        </Button>
        <div className="bg-primary-grey-200 h-fit p-3 rounded-xl cursor-pointer">
          <BellIcon size={28} className="text-gray-400" />
        </div>
        <AccountMenu id={user.id} info={{ name: user.name, avatar: user.photo }}>
          <div className="bg-primary-grey-200 rounded-xl p-2 cursor-pointer">
            <Avatar src={user.photo} alt={user.name} size={36} />
          </div>
        </AccountMenu>
      </div>
    </nav>
  );
};

export default Navbar;
