"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";
import Loader from "../shared/Loader";

interface LiveRoomProps {
  id: string;
  children: React.ReactNode;
}

const LiveRoom = ({ id, children }: LiveRoomProps) => {
  return (
    <RoomProvider
      id={id}
      initialPresence={{
        cursor: null,
        color: null,
        message: null,
      }}
      initialStorage={{ canvasObject: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loader />}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveRoom;
