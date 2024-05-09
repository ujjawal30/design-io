import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SearchInput from "../forms/SearchInput";
import React, { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";

interface ManageCollaboratorsProps {
  children: React.ReactElement;
  design: DesignProps;
  userId: string;
}

const ManageCollaborators = ({ children, design, userId }: ManageCollaboratorsProps) => {
  const { _id, creator, collaborators } = design;

  const collaboratingUsers = [creator, ...collaborators];

  const [value, setValue] = useState("");
  const [users, setUsers] = useState<UserProps[]>(collaboratingUsers);

  // const handleCollaborators = async (userId: string, action: "add" | "remove") => {};

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
      setUsers(collaboratingUsers);
    }
  }, [value]);

  const checkRole = (id: string) => {
    if (id === creator._id) {
      return "creator";
    } else if (collaborators.some((c) => c._id === id)) {
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
            users.map((user) => <UserCard {...user} role={checkRole(user._id)} key={user._id} />)
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCollaborators;
