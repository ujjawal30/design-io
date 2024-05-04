"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";

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
        cursorColor: null,
        editingText: null,
        message: null,
      }}
      initialStorage={{ canvasObject: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveRoom;
