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
  children?: React.ReactElement;
  collaborators: UserProps[];
  creator: UserProps;
}

const CollaboratorsMenu = ({ children, collaborators, creator }: CollaboratorsMenuProps) => {
  const onlineUsers = useOthers();

  const collaboratorsCount = collaborators.length;

  const getColor = (id: string) => {
    const userInfo = onlineUsers.find((user) => user.id === id);

    return userInfo?.presence.color!;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex">
          {collaborators.slice(0, 3).map((collaborator, index) => (
            <Avatar
              key={collaborator._id}
              src={collaborator.photo}
              alt={collaborator.name}
              className={index > 0 ? "-ml-2" : ""}
              style={{
                borderColor: getColor(collaborator._id),
              }}
            />
          ))}

          {collaboratorsCount > 3 && (
            <div className="flex items-center justify-center bg-primary-grey-100 text-sm text-gray-400 border-2 border-primary-grey-200 rounded-full w-8 h-8 p-1 -ml-2">
              +{collaboratorsCount - 3}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-60 mt-4 bg-primary-black border-primary-grey-100 text-white rounded-xl shadow-xl">
        {collaborators.map((collaborator) => (
          <DropdownMenuItem key={collaborator._id} className="gap-4 px-2 py-1">
            <Avatar
              key={collaborator._id}
              src={collaborator.photo}
              alt={collaborator.name}
              size={36}
              style={{
                borderColor: getColor(collaborator._id),
              }}
            />

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
