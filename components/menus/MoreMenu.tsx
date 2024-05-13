"use client";

import { EditIcon, HomeIcon, InfoIcon, PlusCircleIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";

import { editMetadataModal, viewDetailsModal } from "@/hooks/useModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MoreMenuProps {
  children: React.ReactElement;
  design: DesignProps;
  isCreator: boolean;
}

const MoreMenu = ({ children, design, isCreator }: MoreMenuProps) => {
  const editMetadata = editMetadataModal();
  const viewDetails = viewDetailsModal();

  const handleEditClick = () => editMetadata.onOpen(design);
  const handleDetailClick = () => viewDetails.onOpen(design);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary-black border-primary-grey-100 text-white rounded-xl" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem className="gap-4" onClick={handleDetailClick}>
          <InfoIcon size={20} />
          <span>Details</span>
        </DropdownMenuItem>
        {isCreator && (
          <>
            <DropdownMenuItem className="gap-4" onClick={handleEditClick}>
              <EditIcon size={20} />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-4 text-red-500 hover:!text-red-500">
              <TrashIcon size={20} />
              <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreMenu;
