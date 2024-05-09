import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SearchInput from "../forms/SearchInput";
import React, { useState } from "react";
import Image from "next/image";
import UserCard from "../cards/UserCard";

interface ManageCollaboratorsProps {
  children: React.ReactElement;
  creator: UserProps;
  collaborators: UserProps[];
}

const ManageCollaborators = ({ children, collaborators, creator }: ManageCollaboratorsProps) => {
  const [value, setValue] = useState("");

  const allUsers = [creator, ...collaborators];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-primary-black w-full sm:w-[512px] p-8 space-y-2 shadow-xl rounded-xl border-0">
        <DialogHeader className="text-gray-300 space-y-4">
          <DialogTitle>Manage Collaborators </DialogTitle>
          <DialogDescription>Make changes to your design here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <SearchInput value={value} handleInputeChange={setValue} placeholder="Search users to add or remove..." />

        <div className="w-full h-60 p-2 space-y-4 overflow-auto">
          <UserCard {...creator} role="creator" />
          {collaborators.map((user) => (
            <UserCard {...user} role="collaborator" />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCollaborators;
