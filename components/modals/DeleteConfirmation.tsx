import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { confirmDeleteModal } from "@/hooks/useModal";
import { deleteDesign } from "@/lib/actions/design.actions";
import { useRouter } from "next/navigation";

const DeleteConfirmation = () => {
  const { isOpen, design, onClose } = confirmDeleteModal();
  const { push } = useRouter();

  const handleConfirmDelete = async () => {
    const response = await deleteDesign(design?._id!);
    if (response.status) {
      push("/dashboard");
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-primary-black border-primary-grey-100 text-white rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-400">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500">
            This action cannot be undone. This will permanently delete your design from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-gray-300 bg-transparent border-primary-grey-100 hover:bg-primary-grey-100 hover:text-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-500/80" onClick={handleConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
