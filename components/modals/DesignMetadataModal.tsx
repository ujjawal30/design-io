import { editMetadataModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditDesignForm from "@/components/forms/EditDesignForm";
import { useSession } from "next-auth/react";

const DesignMetadataModal = () => {
  const { isOpen, design, onClose } = editMetadataModal();
  const { data } = useSession();

  const editMode = Boolean(design?._id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-black w-full sm:w-[512px] p-8 space-y-2 shadow-xl rounded-xl border-0">
        <DialogHeader className="text-gray-300 space-y-4">
          <DialogTitle>{editMode ? "Edit" : "Create"} Design</DialogTitle>
          <DialogDescription>Make changes to your design here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>

        <EditDesignForm editMode={editMode} id={design?._id!} title={design?.title!} description={design?.description!} userId={data?.user.id!} />
      </DialogContent>
    </Dialog>
  );
};

export default DesignMetadataModal;
