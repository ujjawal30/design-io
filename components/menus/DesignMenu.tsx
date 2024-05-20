"use client";

import { useRouter } from "next/navigation";
import { EditIcon, HomeIcon, InfoIcon, PlusCircleIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";

import { exportToPDF } from "@/lib/utils";
import { confirmDeleteModal, editMetadataModal, viewDetailsModal } from "@/hooks/useModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DesignMenuProps {
  children: React.ReactElement;
  design: DesignProps;
  isCreator: boolean;
}

const DesignMenu = ({ children, design, isCreator }: DesignMenuProps) => {
  const router = useRouter();
  const editMetadata = editMetadataModal();
  const viewDetails = viewDetailsModal();
  const confirmDelete = confirmDeleteModal();

  const handleHomeClick = () => router.push("/dashboard");
  const handleNewClick = () => editMetadata.onOpen({} as DesignProps);
  const handleEditClick = () => editMetadata.onOpen(design);
  const handleDetailClick = () => viewDetails.onOpen(design);
  const handleDeleteClick = () => confirmDelete.onOpen(design);

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
        <DropdownMenuItem className="gap-4" onClick={handleDetailClick}>
          <InfoIcon size={20} />
          <span>Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={exportToPDF}>
          <SquareArrowOutUpRightIcon size={20} />
          <span>Export</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4 text-red-500 hover:!text-red-500 hover:!bg-red-500/10" onClick={handleDeleteClick} disabled={!isCreator}>
          <TrashIcon size={20} />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesignMenu;
