import { editMetadataModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditDesignForm from "@/components/forms/EditDesignForm";

const DesignMetadataModal = () => {
  const { isOpen, design, onClose } = editMetadataModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-black w-full sm:w-[512px] p-8 space-y-6 shadow-xl rounded-xl border-0">
        <DialogHeader className="text-gray-300 space-y-4">
          <DialogTitle>Edit Design</DialogTitle>
          <DialogDescription>Make changes to your design here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <EditDesignForm id={design?._id!} title={design?.title!} description={design?.description!} />
      </DialogContent>
    </Dialog>
  );
};

export default DesignMetadataModal;
