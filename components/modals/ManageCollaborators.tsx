import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { fetchUsers } from "@/lib/actions/user.actions";
import { updateCollaborators } from "@/lib/actions/design.actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SearchInput from "@/components/forms/SearchInput";
import UserCard from "@/components/cards/UserCard";

interface ManageCollaboratorsProps {
  children: React.ReactElement;
  design: DesignProps;
  userId: string;
}

const ManageCollaborators = ({ children, design, userId }: ManageCollaboratorsProps) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<UserProps[]>([design.creator, ...design.collaborators]);

  const pathname = usePathname();

  const handleCollaborators = async (userId: string, action: "add" | "remove") => {
    await updateCollaborators({
      designId: design._id,
      userId,
      action,
      path: pathname,
    });

    setValue("");
  };

  useEffect(() => {
    setUsers([design.creator, ...design.collaborators]);
  }, [design.collaborators.length]);

  useEffect(() => {
    if (value.length > 1) {
      const debounce = setTimeout(async () => {
        const searchUsers = await fetchUsers({ q: value, userId });

        if (searchUsers.status) {
          console.log("searchUsers.data :>> ", searchUsers.data);
          setUsers(searchUsers.data as UserProps[]);
        } else {
          setUsers([]);
        }
      }, 300);

      return () => clearTimeout(debounce);
    } else {
      setUsers([design.creator, ...design.collaborators]);
    }
  }, [value]);

  const checkRole = (id: string) => {
    if (id === design.creator._id) {
      return "creator";
    } else if (design.collaborators.some((c) => c._id === id)) {
      return "collaborator";
    }

    return "none";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-primary-black w-full sm:w-[512px] p-8 space-y-2 shadow-xl rounded-xl border-0">
        <DialogHeader className="text-gray-300 space-y-4">
          <DialogTitle>Manage Collaborators </DialogTitle>
          <DialogDescription>Add collaborators to this design or remove the existing ones.</DialogDescription>
        </DialogHeader>

        <SearchInput value={value} handleInputeChange={setValue} placeholder="Search users to add or remove..." />

        <div className="w-full h-60 p-2 space-y-4 overflow-auto">
          {users.length > 0 ? (
            users.map((user) => <UserCard {...user} role={checkRole(user._id)} key={user._id} handleCollaborators={handleCollaborators} />)
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCollaborators;
