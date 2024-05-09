"use client";

import { signOut } from "next-auth/react";
import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../liveblocks/users/Avatar";

interface AccountMenuProps {
  id: string;
  info: {
    name: string;
    avatar: string;
  };
  children: React.ReactElement;
}

const AccountMenu = ({ id, info, children }: AccountMenuProps) => {
  const onLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 bg-primary-black border-primary-grey-100 text-white rounded-xl shadow-xl">
        <DropdownMenuLabel className="flex items-center gap-4">
          <Avatar src={info.avatar} alt="profile" size={48} />

          <div>
            <h2 className="text-sm font-semibold">{info.name}</h2>
            <span className="text-xs text-primary-grey-300">Administrator</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-4">
            <User size={20} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-4">
            <Settings size={20} />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4 text-red-500 hover:!text-red-500" onClick={onLogout}>
          <LogOut size={20} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
