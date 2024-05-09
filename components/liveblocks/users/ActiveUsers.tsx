"use client";

import styles from "./index.module.css";

import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/liveblocks/users/Avatar";
import CollaboratorsMenu from "@/components/menus/CollaboratorsMenu";
import ManageCollaborators from "@/components/modals/ManageCollaborators";

interface ActiveUsersProps {
  creator: UserProps;
  collaborators: UserProps[];
  userId: string;
  isCreator: boolean;
}

const ActiveUsers = ({ creator, collaborators, userId, isCreator }: ActiveUsersProps) => {
  // const users = useOthers();
  const allCollaborators = isCreator ? collaborators : [creator, ...collaborators.filter((collaborator) => collaborator._id !== userId)];
  const collaboratorsCount = allCollaborators.length;

  return (
    <div className="bg-primary-black rounded-xl p-3 flex gap-2">
      <CollaboratorsMenu collaborators={allCollaborators} creator={creator}>
        <div className="flex first:!ml-0">
          {collaboratorsCount > 0 &&
            allCollaborators
              .slice(0, 3)
              .map((collaborator, index) => (
                <Avatar key={collaborator._id} src={collaborator.photo} name={collaborator.name} className={index > 0 ? "-ml-2" : ""} />
              ))}

          {collaboratorsCount > 3 && (
            <div
              className={cn(styles.avatar, "flex items-center justify-center text-sm -ml-2")}
              data-tooltip={`${collaboratorsCount - 3} more user(s)`}
            >
              +{collaboratorsCount - 3}
            </div>
          )}
        </div>
      </CollaboratorsMenu>

      {isCreator && (
        <ManageCollaborators creator={creator} collaborators={collaborators}>
          <Button className="bg-primary-grey-100 text-gray-400 rounded-full h-fit p-1">
            <PlusIcon size={24} />
          </Button>
        </ManageCollaborators>
      )}
    </div>
  );
};

export default ActiveUsers;
