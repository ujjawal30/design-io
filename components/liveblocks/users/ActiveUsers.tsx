"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollaboratorsMenu from "@/components/menus/CollaboratorsMenu";
import ManageCollaborators from "@/components/modals/ManageCollaborators";

interface ActiveUsersProps {
  design: DesignProps;
  userId: string;
  isCreator: boolean;
}

const ActiveUsers = ({ design, userId, isCreator }: ActiveUsersProps) => {
  const { _id, collaborators, creator } = design;
  const allCollaborators = isCreator ? collaborators : [creator, ...collaborators.filter((collaborator) => collaborator._id !== userId)];

  return (
    <div className="bg-primary-black rounded-xl p-3 flex gap-2">
      {allCollaborators.length > 0 && <CollaboratorsMenu collaborators={allCollaborators} creator={creator} />}

      {isCreator && (
        <ManageCollaborators design={design} userId={userId}>
          <Button className="bg-primary-grey-100 text-gray-400 rounded-full h-fit p-1 !ml-0">
            <PlusIcon size={24} />
          </Button>
        </ManageCollaborators>
      )}
    </div>
  );
};

export default ActiveUsers;
