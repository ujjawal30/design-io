import { viewDetailsModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Avatar from "../liveblocks/users/Avatar";
import { Button } from "../ui/button";

const DesignDetailModal = () => {
  const { isOpen, design, onClose } = viewDetailsModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-primary-black w-full sm:w-[512px] p-8 space-y-2 shadow-xl rounded-xl border-0">
        <DialogHeader className="text-gray-300 space-y-4">
          <DialogTitle>Design Details</DialogTitle>
          <DialogDescription>View the design information.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-gray-500 max-h-[320px] overflow-auto">
          <div className="grid grid-cols-5 items-center gap-4">
            <span className="col-span-2 font-semibold">Title</span>
            <span className="col-span-3 text-gray-300">{design?.title}</span>
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <span className="col-span-2 font-semibold">Description</span>
            <span className="col-span-3 text-gray-300">{design?.description}</span>
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-2 font-semibold">Created On</span>
            <span className="col-span-3 text-gray-300">{design}</span>
          </div> */}
          <div className="grid grid-cols-5 items-center gap-4">
            <span className="col-span-2 font-semibold">Creator</span>
            <div className="col-span-3 text-gray-300 flex items-center gap-2">
              <Avatar src={design?.creator.photo!} size={28} alt={design?.creator.name!} />
              {design?.creator.name}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <span className="col-span-2 font-semibold">Collaborators ({design?.collaborators.length})</span>
            <div className="col-span-3 text-gray-300 flex flex-col gap-2">
              {design?.collaborators.map((collablorator) => (
                <div key={collablorator._id} className="flex items-center gap-2">
                  <Avatar src={collablorator.photo!} size={28} alt={collablorator.name!} />
                  {collablorator.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignDetailModal;
