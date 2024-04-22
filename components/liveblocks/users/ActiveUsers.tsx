"use client";

import { useOthers, useSelf } from "@/liveblocks.config";

import { cn } from "@/lib/utils";
import Avatar from "@/components/liveblocks/users/Avatar";

import styles from "./index.module.css";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > 3;

  return (
    <div className="flex pl-3">
      {users.slice(0, 3).map(({ connectionId, info }) => (
        <Avatar key={connectionId} src={info.avatar} name={info.name} />
      ))}

      {hasMoreUsers && (
        <div
          className={cn(
            styles.avatar,
            "flex items-center justify-center text-lg"
          )}
          data-tooltip={`${users.length - 3} more user(s)`}
        >
          +{users.length - 3}
        </div>
      )}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar src={currentUser.info.avatar} name="You" />
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
