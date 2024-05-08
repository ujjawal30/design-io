"use client";

import styles from "./index.module.css";

import { useMemo } from "react";

import { useOthers, useSelf } from "@/liveblocks.config";
import { cn } from "@/lib/utils";

import Avatar from "@/components/liveblocks/users/Avatar";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";

interface ActiveUsersProps {
  collaborators: UserProps[];
}

const ActiveUsers = ({ collaborators }: ActiveUsersProps) => {
  const users = useOthers();

  const collaboratorsCount = collaborators.length;

  const memoizedActiveUsers = useMemo(
    () => (
      <div className="bg-primary-black rounded-xl p-3 flex gap-2">
        <div className="flex first:!ml-0">
          {collaboratorsCount > 0 &&
            collaborators
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

        <Button className="bg-primary-grey-100 text-gray-500 rounded-full h-fit p-1">
          <PlusIcon size={24} />
        </Button>
      </div>
    ),
    [users.length]
  );

  return memoizedActiveUsers;
};

export default ActiveUsers;
