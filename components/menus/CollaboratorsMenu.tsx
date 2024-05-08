"use client";

import { CircleIcon, Dot, EditIcon, InfoIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";

import { editMetadataModal } from "@/hooks/useModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../liveblocks/users/Avatar";
import { Badge } from "../ui/badge";
import { useOthers } from "@/liveblocks.config";

interface CollaboratorsMenuProps {
  children: React.ReactElement;
  collaborators: UserProps[];
  creator: UserProps;
}

const CollaboratorsMenu = ({ children, collaborators, creator }: CollaboratorsMenuProps) => {
  const onlineUsers = useOthers();

  const getColor = (id: string) => {
    const userInfo = onlineUsers.find((user) => user.id === id);

    return userInfo?.presence.color!;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60 mt-4 bg-primary-black border-primary-grey-100 text-white rounded-xl shadow-xl">
        {collaborators.map((collaborator) => (
          <DropdownMenuItem className="gap-4">
            <Avatar key={collaborator._id} src={collaborator.photo} name={collaborator.name} />
            <span className="text-sm">{collaborator.name}</span>
            {collaborator._id === creator._id && (
              <Badge className="bg-primary-grey-100 text-[10px] font-semibold text-gray-400 hover:bg-none capitalize">CREATOR</Badge>
            )}
            {onlineUsers.some((user) => user.id === collaborator._id) && (
              <DropdownMenuShortcut>
                <CircleIcon size={12} fill={getColor(collaborator._id)} stroke={getColor(collaborator._id)} />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollaboratorsMenu;
