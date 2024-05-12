"use client";

import { EditIcon, HomeIcon, InfoIcon, PlusCircleIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";

import { editMetadataModal } from "@/hooks/useModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DesignMenuProps {
  children: React.ReactElement;
  design: DesignProps;
  isCreator: boolean;
}

const DesignMenu = ({ children, design, isCreator }: DesignMenuProps) => {
  const { push } = useRouter();
  const { onOpen } = editMetadataModal();

  const handleHomeClick = () => push("/dashboard");
  const handleNewClick = () => onOpen({} as DesignProps);
  const handleEditClick = () => onOpen(design);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary-black border-primary-grey-100 text-white rounded-xl">
        <DropdownMenuItem className="gap-4" onClick={handleHomeClick}>
          <HomeIcon size={20} />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={handleNewClick}>
          <PlusCircleIcon size={20} />
          <span>New Design</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4" onClick={handleEditClick} disabled={!isCreator}>
          <EditIcon size={20} />
          <span>Edit Metadata</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <InfoIcon size={20} />
          <span>Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <SquareArrowOutUpRightIcon size={20} />
          <span>Export</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4 text-red-500 hover:!text-red-500" disabled={!isCreator}>
          <TrashIcon size={20} />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesignMenu;
