"use client";

import styles from "./index.module.css";

import { useMemo } from "react";

import { useOthers, useSelf } from "@/liveblocks.config";
import { cn } from "@/lib/utils";

import Avatar from "@/components/liveblocks/users/Avatar";
import AccountMenu from "@/components/menus/AccountMenu";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > 3;

  const memoizedActiveUsers = useMemo(
    () => (
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
          <AccountMenu name={currentUser.info.name}>
            <div className="relative ml-8 first:ml-0">
              <Avatar
                src={currentUser.info.avatar}
                name={currentUser.info.name}
              />
            </div>
          </AccountMenu>
        )}
      </div>
    ),
    [users.length]
  );

  return memoizedActiveUsers;
};

export default ActiveUsers;
