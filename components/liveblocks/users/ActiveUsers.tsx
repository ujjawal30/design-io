import { useOthers, useSelf } from "@/liveblocks.config";

import Avatar from "@/components/liveblocks/users/Avatar";

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
        <div className="flex justify-center items-center border-4 rounded-full border-white w-12 h-12 ml-3 text-white bg-slate-600">
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
