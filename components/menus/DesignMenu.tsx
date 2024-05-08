"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, InfoIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";

interface DesignMenuProps {
  children: React.ReactElement;
}

const DesignMenu = ({ children }: DesignMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary-grey-200 border-primary-black text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Edit Metadata</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <InfoIcon className="mr-2 h-4 w-4" />
            <span>Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SquareArrowOutUpRightIcon className="mr-2 h-4 w-4" />
            <span>Export</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesignMenu;
